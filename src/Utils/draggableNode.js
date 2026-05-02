const PALETTE_MIME = 'application/reactflow';

/** Left accent color only — width uses `border-l-[3px]` on the chip (Tailwind rejects `border-l-[3px_solid_#…]`). */
const VARIANT_BORDER = {
  cyan: 'border-l-[#22d3ee]',
  violet: 'border-l-[#a78bfa]',
  rose: 'border-l-[#fb7185]',
  emerald: 'border-l-[#34d399]',
  amber: 'border-l-[#fbbf24]',
  teal: 'border-l-[#2dd4bf]',
  blue: 'border-l-[#60a5fa]',
  pink: 'border-l-[#f472b6]',
  purple: 'border-l-[#c084fc]',
};

const DRAGGABLE_BASE =
  'cursor-grab select-none border border-[rgba(124,131,253,0.22)] border-l-[3px] bg-[#1a2235] text-[#e8ecf7] shadow-[0_12px_40px_rgba(0,0,0,0.45)] transition-[border-color,transform] duration-150 ease-in-out hover:border-[rgba(124,131,253,0.55)] hover:-translate-y-px active:cursor-grabbing flex items-center justify-center font-semibold max-[560px]:rounded-md max-[560px]:[border-left-width:2px] max-[560px]:px-[0.45rem] max-[560px]:py-[0.3rem] max-[560px]:text-[0.72rem] max-[560px]:shadow-[0_6px_18px_rgba(0,0,0,0.38)] max-[560px]:min-h-10 max-[380px]:min-h-9 max-[380px]:px-[0.32rem] max-[380px]:py-[0.26rem] max-[380px]:text-[0.65rem]';

/** Matches former .draggable-node responsive flex/grid sizing */
const DRAGGABLE_LAYOUT =
  'flex-[1_1_184px] min-h-[52px] min-w-[184px] max-w-[240px] px-3 py-[0.45rem] text-[0.82rem] rounded-lg max-[600px]:flex-[unset] max-[600px]:min-w-0 max-[600px]:max-w-none max-[600px]:w-full min-[601px]:flex-[1_1_0%] min-[601px]:min-h-[clamp(44px,4.2vw,52px)] min-[601px]:min-w-0 min-[601px]:max-w-none min-[601px]:px-[clamp(0.25rem,0.85vw,0.75rem)] min-[601px]:py-[clamp(0.3rem,0.75vw,0.45rem)] min-[601px]:text-[clamp(0.62rem,calc(0.45vw+0.48rem),0.82rem)] max-[560px]:min-h-10 max-[560px]:max-w-none max-[560px]:min-w-0';

const LABEL_SPAN_CLASS =
  'block max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-center';

export const DraggableNode = ({ type, label, variant = 'violet' }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    const payload = JSON.stringify(appData);
    event.dataTransfer.setData(PALETTE_MIME, payload);
    event.dataTransfer.setData('text/plain', payload);
    event.dataTransfer.effectAllowed = 'move';
    event.currentTarget.style.cursor = 'grabbing';
  };

  const border = VARIANT_BORDER[variant] ?? VARIANT_BORDER.violet;

  return (
    <div
      className={`${DRAGGABLE_BASE} ${DRAGGABLE_LAYOUT} ${border}`.trim()}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => {
        event.currentTarget.style.cursor = 'grab';
      }}
      draggable
    >
      <span className={LABEL_SPAN_CLASS}>{label}</span>
    </div>
  );
};
