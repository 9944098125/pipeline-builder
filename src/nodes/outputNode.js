import { useMemo } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './components/BaseNode';
import { NodeField } from './components/NodeField';
import { pipelineControl } from '../Utils/uiClassNames';
import { useNodeFieldState } from '../components/useNodeFieldState';

export function OutputNode({ id, data }) {
  const defaultName = useMemo(
    () => data?.outputName ?? id.replace('customOutput-', 'output_'),
    [data?.outputName, id]
  );
  const [currName, setCurrName] = useNodeFieldState(id, 'outputName', defaultName);
  const [outputType, setOutputType] = useNodeFieldState(id, 'outputType', data?.outputType ?? 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <BaseNode
      nodeId={id}
      title="Output"
      subtitle="Pipeline exit"
      accent="#fb7185"
      handles={[
        {
          handleId: `${id}-value`,
          type: 'target',
          position: Position.Left,
        },
      ]}
    >
      <div className="flex flex-col gap-[0.45rem]">
        <NodeField label="Name">
          <input type="text" value={currName} onChange={handleNameChange} className={pipelineControl} />
        </NodeField>
        <NodeField label="Type">
          <select value={outputType} onChange={handleTypeChange} className={pipelineControl}>
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </NodeField>
      </div>
    </BaseNode>
  );
}
