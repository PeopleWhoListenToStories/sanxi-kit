import { Extension, Node as ProseMirrorNode, PMPlugin, PMPluginKey } from "@sanxi-kit/core";

export interface CharacterCountOptions {
  /**
   * The maximum number of characters that should be allowed. Defaults to `0`.
   * @default null
   * @example 180
   */
  limit: number | null | undefined;
  /**
   * The mode by which the size is calculated. If set to `textSize`, the textContent of the document is used.
   * If set to `nodeSize`, the nodeSize of the document is used.
   * @default 'textSize'
   * @example 'textSize'
   */
  mode: "textSize" | "nodeSize";
}

export interface CharacterCountStorage {
  /**
   * Get the number of characters for the current document.
   * @param options The options for the character count. (optional)
   * @param options.node The node to get the characters from. Defaults to the current document.
   * @param options.mode The mode by which the size is calculated. If set to `textSize`, the textContent of the document is used.
   */
  characters: (options?: { node?: ProseMirrorNode; mode?: "textSize" | "nodeSize" }) => number;

  /**
   * Get the number of words for the current document.
   * @param options The options for the character count. (optional)
   * @param options.node The node to get the words from. Defaults to the current document.
   */
  words: (options?: { node?: ProseMirrorNode }) => number;
}

/**
 * This extension allows you to count the characters and words of your document.
 * @see https://tiptap.dev/api/extensions/character-count
 */
export const CharacterCount = Extension.create<CharacterCountOptions, CharacterCountStorage>({
  name: "characterCount",

  addOptions() {
    return {
      limit: null,
      mode: "textSize",
    };
  },

  addStorage() {
    return {
      characters: () => 0,
      words: () => 0,
    };
  },

  onBeforeCreate() {
    this.storage.characters = (options) => {
      const node = options?.node || this.editor.state.doc;
      const mode = options?.mode || this.options.mode;

      if (mode === "textSize") {
        const text = node.textBetween(0, node.content.size, undefined, " ");

        return text.length;
      }

      return node.nodeSize;
    };

    this.storage.words = (options) => {
      const node = options?.node || this.editor.state.doc;
      const text = node.textBetween(0, node.content.size, " ", " ");
      const words = text.split(" ").filter((word) => word !== "");

      return words.length;
    };
  },

  addProseMirrorPlugins() {
    return [
      new PMPlugin({
        key: new PMPluginKey("characterCount"),
        filterTransaction: (transaction, state) => {
          const limit = this.options.limit;

          // Nothing has changed or no limit is defined. Ignore it.
          if (!transaction.docChanged || limit === 0 || limit === null || limit === undefined) {
            return true;
          }

          const oldSize = this.storage.characters({ node: state.doc });
          const newSize = this.storage.characters({ node: transaction.doc });

          // Everything is in the limit. Good.
          if (newSize <= limit) {
            return true;
          }

          // The limit has already been exceeded but will be reduced.
          if (oldSize > limit && newSize > limit && newSize <= oldSize) {
            return true;
          }

          // The limit has already been exceeded and will be increased further.
          if (oldSize > limit && newSize > limit && newSize > oldSize) {
            return false;
          }

          const isPaste = transaction.getMeta("paste");

          // Block all exceeding transactions that were not pasted.
          if (!isPaste) {
            return false;
          }

          // For pasted content, we try to remove the exceeding content.
          const pos = transaction.selection.$head.pos;
          const over = newSize - limit;
          const from = pos - over;
          const to = pos;

          // It’s probably a bad idea to mutate transactions within `filterTransaction`
          // but for now this is working fine.
          transaction.deleteRange(from, to);

          // In some situations, the limit will continue to be exceeded after trimming.
          // This happens e.g. when truncating within a complex node (e.g. table)
          // and ProseMirror has to close this node again.
          // If this is the case, we prevent the transaction completely.
          const updatedSize = this.storage.characters({ node: transaction.doc });

          if (updatedSize > limit) {
            return false;
          }

          return true;
        },
      }),
    ];
  },
});
