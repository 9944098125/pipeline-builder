import { Position } from 'reactflow';
import { BaseNode } from './components/BaseNode';
import { NodeField } from './components/NodeField';
import { pipelineControl } from '../Utils/uiClassNames';
import { useNodeFieldState } from '../components/useNodeFieldState';

/** Routes one input to one of two outputs (demo branching node). */
export function RouterNode({ id, data }) {
  const [key, setKey] = useNodeFieldState(id, 'routeKey', data?.routeKey ?? 'default');

  return (
    <BaseNode
      nodeId={id}
      title="Router"
      subtitle="Branch output"
      accent="#c084fc"
      handles={[
        { handleId: `${id}-in`, type: 'target', position: Position.Left, style: { top: '50%' } },
        { handleId: `${id}-route-a`, type: 'source', position: Position.Right, style: { top: '35%' } },
        { handleId: `${id}-route-b`, type: 'source', position: Position.Right, style: { top: '65%' } },
      ]}
    >
      <div className="flex flex-col gap-[0.45rem]">
        <NodeField label="Route key">
          <input
            type="text"
            className={pipelineControl}
            value={key}
            onChange={(e) => {
              setKey(e.target.value);
            }}
          />
        </NodeField>
      </div>
    </BaseNode>
  );
}
