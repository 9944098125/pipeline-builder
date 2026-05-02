export const PIPELINE_NODE_CATALOG = [
  { type: 'customInput', label: 'Input', variant: 'cyan', minimapColor: 'rgba(52, 211, 153, 0.78)' },
  { type: 'llm', label: 'LLM', variant: 'violet', minimapColor: 'rgba(124, 131, 253, 0.82)' },
  { type: 'customOutput', label: 'Output', variant: 'rose', minimapColor: 'rgba(251, 113, 133, 0.78)' },
  { type: 'text', label: 'Text', variant: 'emerald', minimapColor: 'rgba(52, 211, 153, 0.72)' },
  { type: 'merge', label: 'Merge', variant: 'amber', minimapColor: 'rgba(251, 191, 36, 0.78)' },
  { type: 'filter', label: 'Filter', variant: 'teal', minimapColor: 'rgba(45, 212, 191, 0.76)' },
  { type: 'transform', label: 'Transform', variant: 'blue', minimapColor: 'rgba(96, 165, 250, 0.78)' },
  { type: 'delay', label: 'Delay', variant: 'pink', minimapColor: 'rgba(244, 114, 182, 0.76)' },
  { type: 'router', label: 'Router', variant: 'purple', minimapColor: 'rgba(192, 132, 252, 0.78)' },
];

export const MINIMAP_NODE_FILL = PIPELINE_NODE_CATALOG.reduce((acc, node) => {
  acc[node.type] = node.minimapColor;
  return acc;
}, {});
