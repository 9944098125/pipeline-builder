/**
 * Extracts unique valid JavaScript identifier names from {{ name }} patterns in order of first appearance.
 */
const VARIABLE_PATTERN = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

export function extractTemplateVariables(text) {
  if (!text || typeof text !== 'string') return [];
  const seen = new Set();
  const ordered = [];
  let match;
  const re = new RegExp(VARIABLE_PATTERN.source, VARIABLE_PATTERN.flags);
  while ((match = re.exec(text)) !== null) {
    const name = match[1];
    if (!seen.has(name)) {
      seen.add(name);
      ordered.push(name);
    }
  }
  return ordered;
}
