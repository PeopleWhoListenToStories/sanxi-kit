<h2 align="center">
    sanxi-kit/web
</h2>

<p align="center">
sanxi-kit is a toolkit editor suite based on tiptap and prosemirror.
</p>

```typescript
import { EditorContent, useEditor } from "@sanxi-kit/react";
import { Document } from "@sanxi-kit/document";
import { TextKit } from "@sanxi-kit/text-kit";
import { BlockTile } from "@sanxi-kit/blocktile";
import { Uuid } from "@sanxi-kit/uuid";

export const Editor = () => {
  const editor = useEditor({
    extensions: [
      Document.extend({ content: "blockTile+" }),
      Uuid,
      BlockTile,
      TextKit,
    ],
  });

  return (
    <div>
      <EditorContent className={styles.editorWrapper} editor={editor}></EditorContent>
    </div>
  );
};
```
