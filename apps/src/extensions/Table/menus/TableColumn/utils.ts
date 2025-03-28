import type { Editor, EditorState, PMEditorView } from '@sanxi-kit/react';

import { Table } from '../..';
import { isTableSelected } from '../../utils';

export const isColumnGripSelected = ({
  editor,
  view,
  state,
  from,
}: {
  editor: Editor;
  view: PMEditorView;
  state: EditorState;
  from: number;
}) => {
  const domAtPos = view.domAtPos(from).node as HTMLElement;
  const nodeDOM = view.nodeDOM(from) as HTMLElement;
  const node = nodeDOM || domAtPos;

  if (!editor.isActive(Table.name) || !node || isTableSelected(state.selection)) {
    return false;
  }

  let container = node;

  while (container && !['TD', 'TH'].includes(container.tagName)) {
    container = container.parentElement!;
  }

  const gripColumn = container && container.querySelector && container.querySelector('a.grip-column.selected');

  return !!gripColumn;
};

export default isColumnGripSelected;
