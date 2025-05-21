import { CellSelection } from "@sanxi-kit/core";

export function isCellSelection(value: unknown): value is CellSelection {
  return value instanceof CellSelection;
}
