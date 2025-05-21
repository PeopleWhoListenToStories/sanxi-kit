import { Node, ReactNodeViewRenderer } from '@sanxi-kit/react';

import { ImageUpload as ImageUploadComponent } from './view/ImageUpload';

declare module '@sanxi-kit/core' {
  type Commands<ReturnType> = {
    imageUpload: {
      setImageUpload: () => ReturnType;
    };
  };
}

export const ImageUpload = Node.create({
  name: 'imageUpload',

  isolating: true,

  defining: true,

  group: 'block',

  draggable: true,

  selectable: true,

  inline: false,

  parseHTML() {
    return [
      {
        tag: `div[data-type="${this.name}"]`,
      },
    ];
  },

  renderHTML() {
    return ['div', { 'data-type': this.name }];
  },

  addCommands() {
    return {
      setImageUpload:
        () =>
          ({ commands }) =>
            commands.insertContent(`<div data-type="${this.name}"></div>`),
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageUploadComponent);
  },
});

export default ImageUpload;
