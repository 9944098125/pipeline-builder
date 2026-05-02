import { InputNode } from './inputNode';
import { LLMNode } from './llmNode';
import { OutputNode } from './outputNode';
import { TextNode } from './textNode';
import { MergeNode } from './mergeNode';
import { FilterNode } from './filterNode';
import { TransformNode } from './transformNode';
import { DelayNode } from './delayNode';
import { RouterNode } from './routerNode';

/** Central registration for React Flow `nodeTypes` — add new node components here only. */
export const pipelineNodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  merge: MergeNode,
  filter: FilterNode,
  transform: TransformNode,
  delay: DelayNode,
  router: RouterNode,
};
