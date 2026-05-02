import { useMemo } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './components/BaseNode';
import { NodeField } from './components/NodeField';
import { pipelineControl } from '../Utils/uiClassNames';
import { useNodeFieldState } from '../components/useNodeFieldState';

export function InputNode({ id, data }) {
  const defaultName = useMemo(
    () => data?.inputName ?? id.replace('customInput-', 'input_'),
    [data?.inputName, id]
  );
  const [currName, setCurrName] = useNodeFieldState(id, 'inputName', defaultName);
  const [inputType, setInputType] = useNodeFieldState(id, 'inputType', data?.inputType ?? 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <BaseNode
      nodeId={id}
      title="Input"
      subtitle="Pipeline entry"
      accent="#22d3ee"
      handles={[
        {
          handleId: `${id}-value`,
          type: 'source',
          position: Position.Right,
        },
      ]}
    >
      <div className="flex flex-col gap-[0.45rem]">
        <NodeField label="Name">
          <input type="text" value={currName} onChange={handleNameChange} className={pipelineControl} />
        </NodeField>
        <NodeField label="Type">
          <select value={inputType} onChange={handleTypeChange} className={pipelineControl}>
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </NodeField>
      </div>
    </BaseNode>
  );
}
