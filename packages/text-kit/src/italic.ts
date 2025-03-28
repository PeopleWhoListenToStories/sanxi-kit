import { Mark, markInputRule, markPasteRule, mergeAttributes } from "@sanxi-kit/core";

export interface ItalicOptions {
  HTMLAttributes: Record<string, unknown>;
}

declare module "@sanxi-kit/core" {
  interface Commands<ReturnType> {
    italic: {
      /**
       * Set an italic mark
       */
      setItalic: () => ReturnType;
      /**
       * Toggle an italic mark
       */
      toggleItalic: () => ReturnType;
      /**
       * Unset an italic mark
       */
      unsetItalic: () => ReturnType;
    };
  }
}

export const starInputRegex = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))$/;
export const starPasteRegex = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))/g;
export const underscoreInputRegex = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))$/;
export const underscorePasteRegex = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))/g;

export const Italic = Mark.create<ItalicOptions>({
  name: "italic",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [
      {
        tag: "em",
      },
      {
        tag: "i",
        getAttrs: (node) => (node as HTMLElement).style.fontStyle !== "normal" && null,
      },
      {
        style: "font-style=italic",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["em", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setItalic:
        () =>
        ({ commands }) => {
          return commands.setMark(this.name);
        },
      toggleItalic:
        () =>
        ({ commands }) => {
          return commands.toggleMark(this.name);
        },
      unsetItalic:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      "Mod-i": () => this.editor.commands.toggleItalic(),
      "Mod-I": () => this.editor.commands.toggleItalic(),
    };
  },

  addInputRules() {
    return [
      markInputRule({
        find: starInputRegex,
        type: this.type,
      }),
      markInputRule({
        find: underscoreInputRegex,
        type: this.type,
      }),
    ];
  },

  addPasteRules() {
    return [
      markPasteRule({
        find: starPasteRegex,
        type: this.type,
      }),
      markPasteRule({
        find: underscorePasteRegex,
        type: this.type,
      }),
    ];
  },
});
