import type { PMEditorView } from '@sanxi-kit/core';
import { mergeAttributes, PMPlugin } from '@sanxi-kit/core';
import { Link as SanxiKitLink } from '@sanxi-kit/link';

export const Link = SanxiKitLink.extend({
  inclusive: false,

  parseHTML() {
    return [{ tag: 'a[href]:not([data-type="button"]):not([href *= "javascript:" i])' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['a', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { class: 'link' }), 0];
  },

  addProseMirrorPlugins() {
    const { editor } = this;

    return [
      ...(this.parent?.() || []),
      new PMPlugin({
        props: {
          handleKeyDown: (view: PMEditorView, event: KeyboardEvent) => {
            const { selection } = editor.state;

            if (event.key === 'Escape' && selection.empty !== true) {
              editor.commands.focus(selection.to, { scrollIntoView: false });
            }

            return false;
          },
        },
      }),
    ];
  },
});

export default Link;
