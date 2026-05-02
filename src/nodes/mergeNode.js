import { Position } from 'reactflow';
import { BaseNode } from './components/BaseNode';
import { NodeField } from './components/NodeField';
import { pipelineControl } from '../Utils/uiClassNames';
import { useNodeFieldState } from '../components/useNodeFieldState';

/** Demo node: combines two upstream branches (abstract pattern showcase). */
export function MergeNode({ id, data }) {
  const [strategy, setStrategy] = useNodeFieldState(id, 'mergeStrategy', data?.mergeStrategy ?? 'concat');

  const onStrategy = (e) => {
    setStrategy(e.target.value);
  };

  return (
    <BaseNode
      nodeId={id}
      title="Merge"
      subtitle="Combine streams"
      accent="#fbbf24"
      handles={[
        { handleId: `${id}-a`, type: 'target', position: Position.Left, style: { top: '35%' } },
        { handleId: `${id}-b`, type: 'target', position: Position.Left, style: { top: '65%' } },
        { handleId: `${id}-out`, type: 'source', position: Position.Right, style: { top: '50%' } },
      ]}
    >
      <div className="flex flex-col gap-[0.45rem]">
        <NodeField label="Strategy">
          <select value={strategy} onChange={onStrategy} className={pipelineControl}>
            <option value="concat">Concatenate</option>
            <option value="zip">Zip</option>
            <option value="latest">Latest wins</option>
          </select>
        </NodeField>
      </div>
    </BaseNode>
  );
}
