import { mergeAttributes, Node } from '@sanxi-kit/core';

import { ReactNodeViewRenderer } from '@sanxi-kit/react';

// import { v4 as uuid } from 'uuid'
import { AiWriterView } from './components/AiWriterView';

declare module '@sanxi-kit/core' {
  type Commands<ReturnType> = {
    aiWriter: {
      setAiWriter: () => ReturnType;
    };
  };
}

export const AiWriter = Node.create({
  name: 'aiWriter',

  group: 'block',

  draggable: true,

  addOptions() {
    return {
      authorId: undefined,
      authorName: undefined,
      HTMLAttributes: {
        class: `node-${this.name}`,
      },
    };
  },

  addAttributes() {
    return {
      id: {
        default: undefined,
        parseHTML: element => element.getAttribute('data-id'),
        renderHTML: attributes => ({
          'data-id': attributes.id,
        }),
      },
      authorId: {
        default: undefined,
        parseHTML: element => element.getAttribute('data-author-id'),
        renderHTML: attributes => ({
          'data-author-id': attributes.authorId,
        }),
      },
      authorName: {
        default: undefined,
        parseHTML: element => element.getAttribute('data-author-name'),
        renderHTML: attributes => ({
          'data-author-name': attributes.authorName,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: `div.node-${this.name}`,
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
  },

  addCommands() {
    return {
      setAiWriter:
        () =>
          ({ chain }) =>
            chain()
              .focus()
              .insertContent({
                type: this.name,
                attrs: {
                // id: uuid(),
                  authorId: this.options.authorId,
                  authorName: this.options.authorName,
                },
              })
              .run(),
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(AiWriterView);
  },
});

export default AiWriter;
