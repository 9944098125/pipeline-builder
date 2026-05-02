// ui.js — pipeline canvas (React Flow)

import { useRef, useCallback, useSyncExternalStore } from "react";
import ReactFlow, { Controls, Background, MiniMap, Panel } from "reactflow";
import { useStore } from "../react-flow-store/store";
import { shallow } from "zustand/shallow";
import { pipelineNodeTypes } from "../nodes/registry";
import { MINIMAP_NODE_FILL } from "../components/pipelineNodeCatalog";

import "reactflow/dist/style.css";

const gridSize = 20;
const proOptions = { hideAttribution: true };

/** React Flow keeps nodes `visibility:hidden` until width/height exist; measurement can stay 0×0 and nodes never appear. */
const DEFAULT_NODE_WIDTH = 280;
const DEFAULT_NODE_HEIGHT = 160;

const selector = (state) => ({
	nodes: state.nodes,
	edges: state.edges,
	getNodeID: state.getNodeID,
	addNode: state.addNode,
	onNodesChange: state.onNodesChange,
	onEdgesChange: state.onEdgesChange,
	onConnect: state.onConnect,
});

function readPalettePayload(dataTransfer) {
	if (!dataTransfer) return null;
	const raw =
		dataTransfer.getData("application/reactflow") ||
		dataTransfer.getData("text/plain");
	if (!raw) return null;
	try {
		return JSON.parse(raw);
	} catch {
		return null;
	}
}

const CANVAS_WRAP_CLASS =
	"pipeline-canvas-wrap relative w-full flex-[1_1_auto] border-b border-[rgba(124,131,253,0.22)] bg-gradient-to-b from-[rgba(18,24,38,0.92)] to-[#0b0f17] shadow-[inset_0_1px_0_rgba(124,131,253,0.07)] min-h-[clamp(320px,50vh,680px)] max-[1024px]:min-h-[clamp(340px,46vh,620px)] max-[768px]:min-h-[clamp(320px,44vh,520px)] max-[560px]:min-h-[clamp(300px,52vh,520px)]";

/** MiniMap reads numeric width/height for viewBox math — CSS clamp breaks scaling. */
let minimapListeners = new Set();
function emitMinimapResize() {
	minimapListeners.forEach((fn) => fn());
}

function subscribeMinimap(cb) {
	minimapListeners.add(cb);
	if (minimapListeners.size === 1) {
		window.addEventListener("resize", emitMinimapResize);
	}
	return () => {
		minimapListeners.delete(cb);
		if (minimapListeners.size === 0) {
			window.removeEventListener("resize", emitMinimapResize);
		}
	};
}

/** Stable refs required: useSyncExternalStore compares snapshots with Object.is — new objects each render cause an infinite loop. */
const SSR_MINIMAP_SNAPSHOT = Object.freeze({ width: 392, height: 216 });

let clientMinimapSnapshot = {
	width: SSR_MINIMAP_SNAPSHOT.width,
	height: SSR_MINIMAP_SNAPSHOT.height,
};

function getMinimapSize() {
	if (typeof window === "undefined") {
		return SSR_MINIMAP_SNAPSHOT;
	}
	const vw = window.innerWidth;
	let w;
	let h;
	if (vw <= 480) {
		w = 268;
		h = 150;
	} else if (vw <= 768) {
		w = 312;
		h = 174;
	} else if (vw <= 1200) {
		w = 360;
		h = 200;
	} else {
		w = 412;
		h = 228;
	}
	if (clientMinimapSnapshot.width !== w || clientMinimapSnapshot.height !== h) {
		clientMinimapSnapshot = { width: w, height: h };
	}
	return clientMinimapSnapshot;
}

function useMinimapSize() {
	return useSyncExternalStore(
		subscribeMinimap,
		getMinimapSize,
		() => SSR_MINIMAP_SNAPSHOT,
	);
}

function minimapNodeColor(node) {
	return MINIMAP_NODE_FILL[node.type] ?? "rgba(124, 131, 253, 0.62)";
}

export const PipelineUI = () => {
	const reactFlowWrapper = useRef(null);
	const rfRef = useRef(null);
	const {
		nodes,
		edges,
		getNodeID,
		addNode,
		onNodesChange,
		onEdgesChange,
		onConnect,
	} = useStore(selector, shallow);

	const minimapSize = useMinimapSize();

	const getInitNodeData = (nodeID, type) => ({
		id: nodeID,
		nodeType: `${type}`,
	});

	/** Allow dropping palette nodes anywhere over the canvas (children often swallow dragover unless parent handles capture). */
	const allowPaletteDragOver = useCallback((event) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = "move";
	}, []);

	const onFlowInit = useCallback((instance) => {
		rfRef.current = instance;
	}, []);

	const handlePaletteDrop = useCallback(
		(event) => {
			event.preventDefault();
			event.stopPropagation();

			const appData = readPalettePayload(event.dataTransfer);
			const type = appData?.nodeType;
			if (typeof type !== "string" || !type) {
				return;
			}

			const wrap = reactFlowWrapper.current;
			if (!wrap) return;

			const bounds = wrap.getBoundingClientRect();
			const rf = rfRef.current;
			const clientX = event.clientX - bounds.left;
			const clientY = event.clientY - bounds.top;

			let position = { x: clientX, y: clientY };
			if (rf?.viewportInitialized && typeof rf.project === "function") {
				position = rf.project({ x: clientX, y: clientY });
			}

			const nodeID = getNodeID(type);
			addNode({
				id: nodeID,
				type,
				position,
				width: DEFAULT_NODE_WIDTH,
				height: DEFAULT_NODE_HEIGHT,
				data: getInitNodeData(nodeID, type),
				dragHandle: ".pipeline-node__header",
			});
		},
		[getNodeID, addNode],
	);

	return (
		<div
			ref={reactFlowWrapper}
			className={CANVAS_WRAP_CLASS}
			onDragEnter={allowPaletteDragOver}
			onDragOver={allowPaletteDragOver}
			onDragOverCapture={allowPaletteDragOver}
			onDropCapture={handlePaletteDrop}>
			<ReactFlow
				className="h-full w-full"
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				onInit={onFlowInit}
				nodeTypes={pipelineNodeTypes}
				proOptions={proOptions}
				snapGrid={[gridSize, gridSize]}
				connectionLineType="smoothstep"
				fitView>
				<Background
					variant="dots"
					color="rgba(124, 131, 253, 0.14)"
					gap={gridSize}
					size={1}
				/>
				<Controls />
				<Panel
					position="bottom-right"
					className="pointer-events-none border-0 bg-transparent p-0 shadow-none"
					style={{
						marginRight: "clamp(10px, 2.5vw, 18px)",
						marginBottom: minimapSize.height + 14,
					}}>
					<div className="flex flex-col items-end gap-0.5 text-right">
						<span className="select-none text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#8b95ad]">
							Overview
						</span>
						<span className="hidden max-w-[min(420px,88vw)] select-none text-[0.58rem] leading-snug text-[#6b7389] sm:block">
							Drag map to pan · Scroll to zoom
						</span>
					</div>
				</Panel>
				<MiniMap
					position="bottom-right"
					style={{
						width: minimapSize.width,
						height: minimapSize.height,
						marginRight: "clamp(10px, 2.5vw, 18px)",
						marginBottom: "clamp(10px, 2.5vw, 18px)",
					}}
					className="overflow-hidden rounded-2xl border border-[rgba(124,131,253,0.38)] bg-[linear-gradient(155deg,rgba(30,38,58,0.98)_0%,rgba(14,19,30,0.99)_100%)] shadow-[0_14px_44px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.04)] !border-solid"
					nodeStrokeWidth={2}
					nodeStrokeColor="rgba(8, 11, 18, 0.94)"
					nodeBorderRadius={6}
					nodeColor={minimapNodeColor}
					maskColor="rgba(11, 15, 23, 0.58)"
					maskStrokeColor="rgba(167, 174, 255, 0.95)"
					maskStrokeWidth={2}
					pannable
					zoomable
					zoomStep={11}
					offsetScale={8}
					ariaLabel="Pipeline overview: drag inside the map to pan the canvas; scroll wheel to zoom."
				/>
			</ReactFlow>
		</div>
	);
};
