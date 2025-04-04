import { Attrs, PMNode } from "@sanxi-kit/core";

export interface ITransferData {
  selectedBlockTile: {
    node: PMNode;
    getPos: () => number;
    dom: HTMLElement;
    updateAttributes: (attrs: Attrs) => void;
  };
  draggingBlockTile: {
    node: PMNode;
    getPos: () => number;
    dom: HTMLElement;
    updateAttributes: (attrs: Attrs) => void;
    startPosition: { x: number; y: number };
  };
  blockTileSideDrag: {
    side: "left" | "right";
    node: PMNode;
    getPos: () => number;
    callback: () => void;
  };
}
