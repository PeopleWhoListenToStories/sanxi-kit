import { Mark, mergeAttributes, StyleParseRule } from '@sanxi-kit/core'

export interface SuperscriptOptions {
  /**
   * HTML attributes to add to the superscript element.
   * @default {}
   * @example { class: 'foo' }
   */
  HTMLAttributes: Object,
}

declare module '@sanxi-kit/core' {
  interface Commands<ReturnType> {
    superscript: {
      /**
       * Set a superscript mark
       * @example editor.commands.setSuperscript()
       */
      setSuperscript: () => ReturnType,
      /**
       * Toggle a superscript mark
       * @example editor.commands.toggleSuperscript()
       */
      toggleSuperscript: () => ReturnType,
      /**
       * Unset a superscript mark
       *  @example editor.commands.unsetSuperscript()
       */
      unsetSuperscript: () => ReturnType,
    }
  }
}

/**
 * This extension allows you to create superscript text.
 * @see https://www.tiptap.dev/api/marks/superscript
 */
export const Superscript = Mark.create<SuperscriptOptions>({
  name: 'superscript',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  parseHTML() {
    return [
      {
        tag: 'sup',
      },
      {
        style: 'vertical-align',
        getAttrs(value) {
          // Don’t match this rule if the vertical align isn’t super.
          if (value !== 'super') {
            return false
          }

          // If it falls through we’ll match, and this mark will be applied.
          return null
        },
      } as StyleParseRule,
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['sup', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setSuperscript: () => ({ commands }) => {
        return commands.setMark(this.name)
      },
      toggleSuperscript: () => ({ commands }) => {
        return commands.toggleMark(this.name)
      },
      unsetSuperscript: () => ({ commands }) => {
        return commands.unsetMark(this.name)
      },
    }
  },

  addKeyboardShortcuts() {
    return {
      'Mod-.': () => this.editor.commands.toggleSuperscript(),
    }
  },
})