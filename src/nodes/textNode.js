import { useLayoutEffect, useRef } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './components/BaseNode';
import { NodeField } from './components/NodeField';
import { extractTemplateVariables } from './utils/extractTemplateVariables';
import { pipelineTextarea } from '../Utils/uiClassNames';
import { useNodeFieldState } from '../components/useNodeFieldState';

const MIN_W = 220;
const MIN_H = 96;
const MAX_W = 520;
const MAX_H = 360;

export function TextNode({ id, data }) {
  const [currText, setCurrText] = useNodeFieldState(id, 'text', data?.text ?? '{{input}}');
  const taRef = useRef(null);
  const vars = extractTemplateVariables(currText);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  useLayoutEffect(() => {
    const el = taRef.current;
    if (!el) return;
    el.style.width = `${MIN_W}px`;
    el.style.height = `${MIN_H}px`;
    const nextH = Math.min(MAX_H, Math.max(MIN_H, el.scrollHeight));
    const nextW = Math.min(MAX_W, Math.max(MIN_W, el.scrollWidth));
    el.style.height = `${nextH}px`;
    el.style.width = `${nextW}px`;
  }, [currText]);

  const variableHandles = vars.map((name, index) => ({
    handleId: `${id}-var-${name}`,
    type: 'target',
    position: Position.Left,
    style: {
      top: `${((index + 1) / (vars.length + 1)) * 100}%`,
    },
  }));

  const handles = [
    ...variableHandles,
    {
      handleId: `${id}-output`,
      type: 'source',
      position: Position.Right,
      style: { top: '50%' },
    },
  ];

  return (
    <BaseNode
      nodeId={id}
      title="Text"
      subtitle="Template & variables"
      accent="#34d399"
      handles={handles}
    >
      <div className="flex flex-col gap-[0.35rem]">
        <NodeField label="Text">
          <textarea
            ref={taRef}
            className={`${pipelineTextarea} nodrag`}
            value={currText}
            onChange={handleTextChange}
            rows={3}
            spellCheck={false}
          />
        </NodeField>
        {vars.length > 0 ? (
          <p className="m-0 mt-[0.15rem] text-[0.72rem] leading-[1.45] text-[#8b95ad]">
            Variables: {vars.join(', ')}
          </p>
        ) : (
          <p className="m-0 mt-[0.15rem] text-[0.72rem] leading-[1.45] text-[#8b95ad]">
            Use{' '}
            <code className="rounded bg-[rgba(124,131,253,0.12)] px-[0.35rem] py-0.5 font-mono text-[0.68rem] text-[#c4c8ff]">{`{{variableName}}`}</code>{' '}
            for inputs.
          </p>
        )}
      </div>
    </BaseNode>
  );
}
