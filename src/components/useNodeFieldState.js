import { useCallback, useState } from 'react';
import { useStore } from '../react-flow-store/store';

export function useNodeFieldState(nodeId, fieldName, initialValue) {
  const updateNodeField = useStore((s) => s.updateNodeField);
  const [value, setValue] = useState(initialValue);

  const setAndPersist = useCallback(
    (nextValue) => {
      setValue(nextValue);
      updateNodeField(nodeId, fieldName, nextValue);
    },
    [fieldName, nodeId, updateNodeField]
  );

  return [value, setAndPersist];
}
