import type { Editor, PMNode } from '@sanxi-kit/core';

import { useCallback, useState } from 'react';

export const useData = () => {
  const [currentNode, setCurrentNode] = useState<PMNode | null>(null);
  const [currentNodePos, setCurrentNodePos] = useState<number>(-1);

  const handleNodeChange = useCallback(
    (data: { node: PMNode | null; editor: Editor; pos: number }) => {
      if (data.node) {
        setCurrentNode(data.node);
      }

      setCurrentNodePos(data.pos);
    },
    [setCurrentNodePos, setCurrentNode],
  );

  return {
    currentNode,
    currentNodePos,
    setCurrentNode,
    setCurrentNodePos,
    handleNodeChange,
  };
};
