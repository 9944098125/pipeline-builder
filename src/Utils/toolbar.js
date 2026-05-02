import { DraggableNode } from './draggableNode';
import { useStore } from '../react-flow-store/store';
import { shallow } from 'zustand/shallow';
import { PIPELINE_NODE_CATALOG } from '../components/pipelineNodeCatalog';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  clearCanvas: state.clearCanvas,
});

export const PipelineToolbar = () => {
  const { nodes, edges, clearCanvas } = useStore(selector, shallow);
  const hasCanvasContent = nodes.length > 0 || edges.length > 0;

  return (
    <div className="border-b border-[rgba(124,131,253,0.22)] bg-[#121826] px-[clamp(0.85rem,3vw,1.25rem)] pb-[clamp(0.75rem,2vw,1rem)] pt-[clamp(0.6rem,2vw,0.75rem)] max-[560px]:px-[clamp(0.55rem,2.5vw,0.75rem)] max-[560px]:pb-[clamp(0.45rem,1.5vw,0.55rem)] max-[560px]:pt-[clamp(0.4rem,2vw,0.55rem)]">
      <div className="mb-[0.65rem] flex items-center justify-between gap-3 max-[768px]:mb-2 max-[560px]:mb-[0.35rem]">
        <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-[#8b95ad] max-[560px]:text-[0.62rem] max-[560px]:tracking-[0.06em]">
          Drag nodes onto the canvas
        </span>
        <button
          type="button"
          onClick={clearCanvas}
          disabled={!hasCanvasContent}
          className="rounded-md border border-[rgba(251,113,133,0.42)] bg-[rgba(251,113,133,0.12)] px-2.5 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.06em] text-[#fecdd3] transition-colors hover:bg-[rgba(251,113,133,0.2)] disabled:cursor-not-allowed disabled:border-[rgba(124,131,253,0.2)] disabled:bg-transparent disabled:text-[#667089] max-[560px]:px-2 max-[560px]:py-0.5 max-[560px]:text-[0.58rem]"
        >
          Clear canvas
        </button>
      </div>
      <div className="max-[600px]:grid max-[600px]:grid-cols-4 max-[600px]:gap-[clamp(0.28rem,1.2vw,0.45rem)] max-[560px]:gap-[0.35rem] max-[380px]:gap-[0.28rem] min-[601px]:flex min-[601px]:flex-nowrap min-[601px]:gap-[clamp(0.3rem,0.65vw,0.6rem)]">
        {PIPELINE_NODE_CATALOG.map((node) => (
          <DraggableNode key={node.type} type={node.type} label={node.label} variant={node.variant} />
        ))}
      </div>
    </div>
  );
};
