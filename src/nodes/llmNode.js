import { Position } from 'reactflow';
import { BaseNode } from './components/BaseNode';

export function LLMNode({ id }) {
  return (
    <BaseNode
      nodeId={id}
      title="LLM"
      subtitle="Language model"
      accent="#a78bfa"
      handles={[
        {
          handleId: `${id}-system`,
          type: 'target',
          position: Position.Left,
          style: { top: '32%' },
        },
        {
          handleId: `${id}-prompt`,
          type: 'target',
          position: Position.Left,
          style: { top: '68%' },
        },
        {
          handleId: `${id}-response`,
          type: 'source',
          position: Position.Right,
          style: { top: '50%' },
        },
      ]}
    >
      <p className="m-0 text-[0.72rem] leading-[1.45] text-[#8b95ad]">
        Connect system and prompt inputs, then route the response onward.
      </p>
    </BaseNode>
  );
}
