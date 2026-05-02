import { Position } from 'reactflow';
import { BaseNode } from './components/BaseNode';
import { NodeField } from './components/NodeField';
import { pipelineControl } from '../Utils/uiClassNames';
import { useNodeFieldState } from '../components/useNodeFieldState';

export function DelayNode({ id, data }) {
  const [ms, setMs] = useNodeFieldState(id, 'delayMs', data?.delayMs ?? 250);

  return (
    <BaseNode
      nodeId={id}
      title="Delay"
      subtitle="Throttle / wait"
      accent="#f472b6"
      handles={[
        { handleId: `${id}-in`, type: 'target', position: Position.Left, style: { top: '50%' } },
        { handleId: `${id}-out`, type: 'source', position: Position.Right, style: { top: '50%' } },
      ]}
    >
      <div className="flex flex-col gap-[0.45rem]">
        <NodeField label="Milliseconds">
          <input
            type="number"
            min={0}
            className={pipelineControl}
            value={ms}
            onChange={(e) => {
              setMs(Number(e.target.value));
            }}
          />
        </NodeField>
      </div>
    </BaseNode>
  );
}
