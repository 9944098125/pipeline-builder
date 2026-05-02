import { Position } from 'reactflow';
import { BaseNode } from './components/BaseNode';
import { NodeField } from './components/NodeField';
import { pipelineControl } from '../Utils/uiClassNames';
import { useNodeFieldState } from '../components/useNodeFieldState';

export function FilterNode({ id, data }) {
  const [mode, setMode] = useNodeFieldState(id, 'filterMode', data?.filterMode ?? 'nonempty');

  return (
    <BaseNode
      nodeId={id}
      title="Filter"
      subtitle="Drop unwanted items"
      accent="#2dd4bf"
      handles={[
        { handleId: `${id}-in`, type: 'target', position: Position.Left, style: { top: '50%' } },
        { handleId: `${id}-out`, type: 'source', position: Position.Right, style: { top: '50%' } },
      ]}
    >
      <div className="flex flex-col gap-[0.45rem]">
        <NodeField label="Keep">
          <select
            value={mode}
            onChange={(e) => {
              setMode(e.target.value);
            }}
            className={pipelineControl}
          >
            <option value="nonempty">Non-empty</option>
            <option value="numeric">Numeric only</option>
            <option value="maxlen">Max length {'<'} 500</option>
          </select>
        </NodeField>
      </div>
    </BaseNode>
  );
}
