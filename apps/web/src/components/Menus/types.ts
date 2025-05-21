import type { Editor as CoreEditor, EditorState, PMEditorView } from '@sanxi-kit/core';
import type { Editor } from '@sanxi-kit/react';

import type React from 'react';

export type MenuProps = {
  editor: Editor;
  appendTo?: React.RefObject<any>;
  shouldHide?: boolean;
};

export type ShouldShowProps = {
  editor?: CoreEditor;
  view: PMEditorView;
  state?: EditorState;
  oldState?: EditorState;
  from?: number;
  to?: number;
};
