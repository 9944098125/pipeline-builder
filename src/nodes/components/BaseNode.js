import { Handle } from 'reactflow';
import { useStore } from '../../react-flow-store/store';

/**
 * Shared shell for pipeline nodes: header, optional subtitle, body slot, and declarative handles.
 *
 * @param {object} props
 * @param {string} props.title
 * @param {string} [props.subtitle]
 * @param {string} [props.accent] CSS color for accent bar
 * @param {string} [props.className] Extra class names on root
 * @param {string} [props.nodeId] When set, shows remove control and deletes this node from the canvas
 * @param {React.ReactNode} props.children
 * @param {Array<{ handleId: string, type: 'source' | 'target', position: import('reactflow').Position, style?: object }>} [props.handles]
 */
export function BaseNode({
  title,
  subtitle,
  accent = '#7c83fd',
  className = '',
  nodeId,
  children,
  handles = [],
}) {
  const removeNode = useStore((s) => s.removeNode);

  return (
    <div
      className={`relative min-w-[clamp(180px,36vw,220px)] max-w-[min(540px,calc(100vw-2rem))] overflow-visible rounded-xl border border-[rgba(124,131,253,0.22)] bg-[#1a2235] shadow-[0_12px_40px_rgba(0,0,0,0.45)] max-[768px]:min-w-[clamp(170px,44vw,210px)] max-[768px]:max-w-[min(500px,calc(100vw-1.5rem))] max-[560px]:min-w-[160px] max-[560px]:max-w-[calc(100vw-1rem)] ${className}`.trim()}
      style={{ '--pipeline-node-accent': accent }}
    >
      {nodeId ? (
        <button
          type="button"
          className="nodrag nopan absolute right-1 top-1 z-[3] flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[rgba(124,131,253,0.25)] bg-[rgba(11,15,23,0.85)] text-[1.05rem] font-light leading-none text-[#c4c8ff] shadow-[0_2px_8px_rgba(0,0,0,0.35)] transition hover:border-[rgba(251,113,133,0.45)] hover:bg-[rgba(251,113,133,0.12)] hover:text-[#fda4af] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(124,131,253,0.6)]"
          aria-label="Remove node from canvas"
          onClick={(e) => {
            e.stopPropagation();
            removeNode(nodeId);
          }}
        >
          ×
        </button>
      ) : null}
      <div
        className="absolute bottom-0 left-0 top-0 w-1 rounded-l-xl bg-[var(--pipeline-node-accent,#7c83fd)]"
        aria-hidden
      />
      <div
        className={`pipeline-node__header cursor-grab border-b border-[rgba(124,131,253,0.12)] px-[0.85rem] pb-[0.45rem] pl-4 pt-[0.65rem] active:cursor-grabbing ${nodeId ? 'pr-10' : ''}`.trim()}
      >
        <div className="flex flex-col gap-[0.1rem]">
          <span className="text-[0.88rem] font-bold tracking-[-0.01em]">{title}</span>
          {subtitle ? (
            <span className="text-[0.68rem] font-medium uppercase tracking-[0.06em] text-[#8b95ad]">
              {subtitle}
            </span>
          ) : null}
        </div>
      </div>
      <div className="px-[0.85rem] pb-3 pl-4 pt-[0.55rem]">{children}</div>
      {handles.map((h) => (
        <Handle
          key={h.handleId}
          id={h.handleId}
          type={h.type}
          position={h.position}
          style={h.style}
          className="pipeline-node__handle"
        />
      ))}
    </div>
  );
}
