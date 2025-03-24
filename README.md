<h2 align="center">
    sanxi/web
</h2>

<p align="center">
sanxi is a toolkit editor suite based on tiptap and prosemirror.
</p>

```typescript
import { EditorContent, useEditor } from "@sanxi/react";
import { Document } from "@sanxi/document";
import { TextKit } from "@sanxi/text-kit";
import { BlockTile } from "@sanxi/blocktile";
import { Uuid } from "@sanxi/uuid";

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
