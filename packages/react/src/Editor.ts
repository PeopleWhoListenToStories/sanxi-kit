import React from "react";

import { Editor as CoreEditor } from "@sanxi-kit/core";

import { EditorContentProps, EditorContentState } from "./EditorContent";
import { ReactRenderer } from "./ReactRenderer";

type ContentComponent = React.Component<EditorContentProps, EditorContentState> & {
  setRenderer(id: string, renderer: ReactRenderer): void;
  removeRenderer(id: string): void;
};

export class Editor extends CoreEditor {
  public contentComponent: ContentComponent | null = null;
}
