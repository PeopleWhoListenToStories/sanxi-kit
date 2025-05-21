// import { EmojiItem } from '@tiptap-pro/extension-emoji'

type EmojiItem = {};

export type Command = {
  name: string;
};

export type EmojiListProps = {
  command: (command: Command) => void;
  items: EmojiItem[];
};
