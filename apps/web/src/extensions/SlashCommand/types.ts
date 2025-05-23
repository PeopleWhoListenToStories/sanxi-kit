import type { Editor } from '@tiptap/core';

import type { icons } from 'lucide-react';

export type Group = {
  name: string;
  title: string;
  commands: Command[];
};

export type Command = {
  name: string;
  label: string;
  description: string;
  aliases?: string[];
  iconName: keyof typeof icons;
  action: (editor: Editor) => void;
  shouldBeHidden?: (editor: Editor) => boolean;
};

export type MenuListProps = {
  editor: Editor;
  items: Group[];
  command: (command: Command) => void;
};
