# VectorShift frontend — agent guide

This directory is a **Create React App** (react-scripts 5) app using **JavaScript** (not TypeScript), **React 18**, **React Flow 11**, and **Zustand** for pipeline editor state.

Other files under `.cursor/rules/` may describe a broader template stack (TypeScript, MUI, tRPC). **Ignore those for day-to-day edits in this app** unless you are intentionally migrating the stack. Prefer the rule `vectorshift-pipeline-ui.mdc` and this file.

## Layout

| Path | Role |
|------|------|
| `src/App.js` | Composes toolbar, canvas UI, submit area |
| `src/store.js` | Zustand store: `nodes`, `edges`, React Flow change handlers, `getNodeID`, `addNode`, `updateNodeField` |
| `src/ui.js` | `PipelineUI`: React Flow canvas, drag-and-drop from toolbar, `nodeTypes` map |
| `src/toolbar.js` | `PipelineToolbar`: palette of draggable node kinds |
| `src/submit.js` | `SubmitButton` (placeholder; not wired to API yet) |
| `src/draggableNode.js` | Sets `dataTransfer` MIME `application/reactflow` with JSON `{ nodeType }` |
| `src/nodes/*.js` | Custom node components; keys must match `nodeTypes` in `ui.js` |

## React Flow conventions

- **Node type strings** (must stay in sync across toolbar, `nodeTypes`, and drop handler): `customInput`, `llm`, `customOutput`, `text`.
- **Handles**: use stable string ids such as `` `${id}-value` `` / `` `${id}-system` `` / `` `${id}-prompt` `` / `` `${id}-response` `` / `` `${id}-output` `` so edges remain identifiable.
- **Imports**: `import 'reactflow/dist/style.css'` is required where `ReactFlow` is rendered (`ui.js`).

## State and performance

- Select store slices with a **selector** and **`shallow`** from `zustand/shallow` in `ui.js` to avoid unnecessary re-renders.

## Style

- Inline styles are used throughout; match existing patterns when adding UI.
- When wiring forms, prefer controlled inputs like the existing node components.

## Commands

```bash
cd frontend && npm install && npm start
npm test
npm run build
```

## Backend integration (planned)

The FastAPI app exposes `GET /` and `GET /pipelines/parse`. When implementing submit, align HTTP method and body shape with whatever the backend contract becomes after `submit.js` is implemented.
