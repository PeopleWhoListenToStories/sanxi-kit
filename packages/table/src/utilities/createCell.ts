import { Fragment, PMNode, PMNodeType } from "@sanxi-kit/core";

export function createCell(
  cellType: PMNodeType,
  cellContent?: Fragment | PMNode | Array<PMNode>,
): PMNode | null | undefined {
  if (cellContent) {
    return cellType.createChecked(null, cellContent);
  }

  return cellType.createAndFill();
}
