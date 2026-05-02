import { Position } from 'reactflow';
import { BaseNode } from './components/BaseNode';
import { NodeField } from './components/NodeField';
import { pipelineControl } from '../Utils/uiClassNames';
import { useNodeFieldState } from '../components/useNodeFieldState';

export function TransformNode({ id, data }) {
  const [expr, setExpr] = useNodeFieldState(id, 'transformExpr', data?.transformExpr ?? 'value.trim()');

  return (
    <BaseNode
      nodeId={id}
      title="Transform"
      subtitle="Map values"
      accent="#60a5fa"
      handles={[
        { handleId: `${id}-in`, type: 'target', position: Position.Left, style: { top: '50%' } },
        { handleId: `${id}-out`, type: 'source', position: Position.Right, style: { top: '50%' } },
      ]}
    >
      <div className="flex flex-col gap-[0.45rem]">
        <NodeField label="Expression">
          <input
            type="text"
            className={pipelineControl}
            value={expr}
            onChange={(e) => {
              setExpr(e.target.value);
            }}
          />
        </NodeField>
      </div>
    </BaseNode>
  );
}
