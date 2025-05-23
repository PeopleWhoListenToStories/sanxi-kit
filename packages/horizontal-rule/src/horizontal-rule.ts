import { mergeAttributes, Node, nodeInputRule, TextSelection } from "@sanxi-kit/core";

export interface HorizontalRuleOptions {
  HTMLAttributes: Record<string, unknown>;
}

declare module "@sanxi-kit/core" {
  interface Commands<ReturnType> {
    horizontalRule: {
      setHorizontalRule: () => ReturnType;
    };
  }
}

export const HorizontalRule = Node.create<HorizontalRuleOptions>({
  name: "horizontalRule",
  group: "block",
  selectable: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [{ tag: "hr" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["hr", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
  },

  addCommands() {
    return {
      setHorizontalRule:
        () =>
        ({ chain }) => {
          return chain()
            .insertContent({ type: this.name })
            .command(({ tr, dispatch }) => {
              if (dispatch) {
                const { $to } = tr.selection;
                const posAfter = $to.end();

                if ($to.nodeAfter) {
                  tr.setSelection(TextSelection.create(tr.doc, $to.pos));
                } else {
                  const node = $to.parent.type.contentMatch.defaultType?.create();

                  if (node) {
                    tr.insert(posAfter, node);
                    tr.setSelection(TextSelection.create(tr.doc, posAfter));
                  }
                }

                tr.scrollIntoView();
              }

              return true;
            })
            .run();
        },
    };
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: /^(?:---|—-|___\s|\*\*\*\s)$/,
        type: this.type,
      }),
    ];
  },
});
