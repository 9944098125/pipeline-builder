# Frontend — task log

Use this file to track in-flight work and decisions for the VectorShift pipeline UI (Create React App + React Flow + Zustand).

## Current architecture (snapshot)

- **Stack:** React 18, react-scripts 5, reactflow ^11.8, zustand (used in `store.js` / `ui.js`; ensure it stays installed—direct dependency recommended).
- **Features implemented:** Draggable palette → drop onto canvas; nodes and edges in global store; smoothstep animated edges with arrow marker; minimap, controls, background grid.
- **Not implemented:** Submit button does not call the backend; node field edits are mostly local component state and are not all synced into `updateNodeField` in the store.

## How to run

```bash
cd frontend
npm install
npm start
```

## Open tasks (edit as you go)

| ID | Task | Status |
|----|------|--------|
| F-1 | Wire `SubmitButton` to backend: serialize `nodes`/`edges` (and node data) to the API the backend expects | todo |
| F-2 | Sync node inputs with Zustand (`updateNodeField`) so submission sees latest names/types/text | todo |
| F-3 | Fix typo `100wv` → `100vw` in `ui.js` wrapper style if full viewport width is intended | todo |
| F-4 | Add `zustand` to `package.json` `dependencies` if it is only transitive via reactflow | optional |

## Notes for implementers

- Dropped nodes receive `data` from `getInitNodeData` (`id`, `nodeType`).
- `getNodeID` in the store maintains per-type counters in `nodeIDs`; keep initial state consistent if you extend the store.
