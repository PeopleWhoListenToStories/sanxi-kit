import { create } from "zustand";

interface TreeState {
  expandedNodes: Set<string>;
  setExpanded: (nodeId: string, isExpanded: boolean) => void;
}

export const useTreeStore = create<TreeState>((set) => ({
  expandedNodes: new Set(),
  setExpanded: (nodeId, isExpanded) => set((state) => {
    const newExpandedNodes = new Set(state.expandedNodes);
    if (isExpanded) {
      newExpandedNodes.add(nodeId);
    } else {
      newExpandedNodes.delete(nodeId);
    }
    return { expandedNodes: newExpandedNodes };
  }),
}));