// import { Dropdown, Popover } from '@douyinfe/semi-ui';

// import { IUser } from '@think/domains';

// import { Editor } from 'tiptap/core';

// import { GridSelect } from 'components/grid-select';
// import {
//   IconAttachment,
//   IconCallout,
//   IconCodeBlock,
//   IconCountdown,
//   IconDocument,
//   IconFlow,
//   IconImage,
//   IconLayout,
//   IconLink,
//   IconMath,
//   IconMind,
//   IconStatus,
//   IconTable,
//   IconTableOfContents,
// } from 'components/icons';
// import { CodeIcon } from '@radix-ui/react-icons';
import type { Editor } from '@sanxi-kit/core';

import { Icon } from '~/components/ui/icon';
import { createKeysLocalStorageLRUCache } from '~/helpers/lru-cache';

// import { createCountdown } from './countdown/service';

// export type ITitle = {
//   title: string;
// };

type IBaseCommand = {
  isBlock?: boolean;
  icon: React.ReactNode;
  label: string;
  pinyin: string;
  type: number;
  typeName: string;
  user?: any;
};

type IAction = (editor: Editor, user?: any) => void;

export type ILabelRenderCommand = IBaseCommand & {
  action: IAction;
};

// type ICustomRenderCommand = IBaseCommand & {
//   custom: (editor: Editor, runCommand: (arg: { label: string; action: IAction }) => any) => React.ReactNode;
// };

// export type ICommand = ITitle | ILabelRenderCommand | ICustomRenderCommand;

// export const insertMenuLRUCache = createKeysLocalStorageLRUCache('TIPTAP_INSERT_MENU', 3);

// export const COMMANDS: ICommand[] = [
//   {
//     title: '通用',
//   },

//   {
//     icon: <IconTableOfContents />,
//     label: '目录',
//     pinyin: 'mulu',
//     action: (editor) => editor.chain().focus().setTableOfContents().run(),
//   },
//   {
//     isBlock: true,
//     icon: <IconTable />,
//     label: '表格',
//     pinyin: 'biaoge',
//     custom: (editor, runCommand) => (
//       <Popover
//         key="custom-table"
//         showArrow
//         position="rightTop"
//         zIndex={10000}
//         content={
//           <div style={{ padding: 0 }}>
//             <GridSelect
//               onSelect={({ rows, cols }) => {
//                 return runCommand({
//                   label: '表格',
//                   action: () => {
//                     editor.chain().focus().run();
//                     editor.chain().insertTable({ rows, cols, withHeaderRow: true }).focus().run();
//                   },
//                 })();
//               }}
//             />
//           </div>
//         }
//       >
//         <Dropdown.Item>
//           <IconTable />
//           表格
//         </Dropdown.Item>
//       </Popover>
//     ),
//   },
//   {
//     isBlock: true,
//     icon: <IconLayout />,
//     label: '布局',
//     pinyin: 'buju',
//     custom: (editor, runCommand) => (
//       <Popover
//         key="custom-columns"
//         showArrow
//         position="rightTop"
//         zIndex={10000}
//         content={
//           <div style={{ padding: 0 }}>
//             <GridSelect
//               rows={1}
//               cols={5}
//               onSelect={({ cols }) => {
//                 return runCommand({
//                   label: '布局',
//                   action: () => {
//                     editor.chain().focus().run();
//                     editor.chain().insertColumns({ cols }).focus().run();
//                   },
//                 })();
//               }}
//             />
//           </div>
//         }
//       >
//         <Dropdown.Item>
//           <IconLayout />
//           布局
//         </Dropdown.Item>
//       </Popover>
//     ),
//   },
//   {
//     isBlock: true,
//     icon: <CodeIcon />,
//     label: '代码块',
//     pinyin: 'daimakuai',
//     action: (editor) => editor.chain().focus().toggleCodeBlock().run(),
//   },
//   {
//     isBlock: true,
//     icon: <IconImage />,
//     label: '图片',
//     pinyin: 'tupian',
//     action: (editor) => editor.chain().focus().setEmptyImage({ width: '100%' }).run(),
//   },
//   {
//     isBlock: true,
//     icon: <IconAttachment />,
//     label: '附件',
//     pinyin: 'fujian',
//     action: (editor) => editor.chain().focus().setAttachment().run(),
//   },
//   {
//     isBlock: true,
//     icon: <IconCountdown />,
//     label: '倒计时',
//     pinyin: 'daojishi',
//     action: (editor) => createCountdown(editor),
//   },
//   {
//     isBlock: true,
//     icon: <IconLink />,
//     label: '外链',
//     pinyin: 'wailian',
//     action: (editor, user) =>
//       editor.chain().focus().setIframe({ url: '', defaultShowPicker: true, createUser: user.id }).run(),
//   },
//   {
//     title: '卡片',
//   },
//   {
//     isBlock: true,
//     icon: <IconFlow />,
//     label: '流程图',
//     pinyin: 'liuchengtu',
//     action: (editor, user) => {
//       editor.chain().focus().setFlow({ width: '100%', defaultShowPicker: true, createUser: user.id }).run();
//     },
//   },
//   {
//     isBlock: true,
//     icon: <IconMind />,
//     label: '思维导图',
//     pinyin: 'siweidaotu',
//     action: (editor, user) => {
//       editor.chain().focus().setMind({ width: '100%', defaultShowPicker: true, createUser: user.id }).run();
//     },
//   },
//   {
//     isBlock: true,
//     icon: <IconMind />,
//     label: '绘图',
//     pinyin: 'huitu',
//     action: (editor, user) => {
//       editor.chain().focus().setExcalidraw({ width: '100%', defaultShowPicker: true, createUser: user.id }).run();
//     },
//   },
//   {
//     isBlock: true,
//     icon: <IconMath />,
//     label: '数学公式',
//     pinyin: 'shuxuegongshi',
//     action: (editor, user) => editor.chain().focus().setKatex({ defaultShowPicker: true, createUser: user.id }).run(),
//   },
//   {
//     icon: <IconStatus />,
//     label: '状态',
//     pinyin: 'zhuangtai',
//     action: (editor, user) => editor.chain().focus().setStatus({ defaultShowPicker: true, createUser: user.id }).run(),
//   },
//   {
//     isBlock: true,
//     icon: <IconCallout />,
//     label: '高亮块',
//     pinyin: 'gaoliangkuai',
//     action: (editor) => editor.chain().focus().setCallout().run(),
//   },
//   {
//     title: '内容引用',
//   },
//   {
//     isBlock: true,
//     icon: <IconDocument />,
//     label: '文档',
//     pinyin: 'wendang',
//     action: (editor, user) =>
//       editor.chain().focus().setDocumentReference({ defaultShowPicker: true, createUser: user.id }).run(),
//   },
//   {
//     isBlock: true,
//     icon: <IconDocument />,
//     label: '子文档',
//     pinyin: 'ziwendang',
//     action: (editor) => editor.chain().focus().setDocumentChildren().run(),
//   },
// ];

// export const QUICK_INSERT_COMMANDS = [
//   ...COMMANDS.slice(0, 1),
//   {
//     icon: <IconTable />,
//     label: '表格',
//     pinyin: 'biaoge',
//     action: (editor: Editor) => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
//   },
//   {
//     isBlock: true,
//     icon: <IconLayout />,
//     label: '布局',
//     pinyin: 'buju',
//     action: (editor) => editor.chain().focus().insertColumns({ cols: 2 }).run(),
//   },
//   ...COMMANDS.slice(4),
// ];

export const insertMenuLRUCache = createKeysLocalStorageLRUCache('TIPTAP_INSERT_MENU', 3);

export const QUICK_INSERT_COMMANDS = [
  {
    title: '通用',
  },
  {
    isBlock: true,
    icon: <Icon className="Bot" />,
    label: 'AI Writer',
    pinyin: 'AI Writer',
    type: 1,
    typeName: 'AI',
    // action: (editor) => editor.chain().focus().toggleCodeBlock().run(),
  },
  {
    isBlock: true,
    icon: <Icon className="Bot" />,
    label: 'Heading 1',
    pinyin: 'heading-1',
    type: 2,
    typeName: 'FORMAT',
    // action: (editor) => editor.chain().focus().toggleCodeBlock().run(),
  },
  {
    isBlock: true,
    icon: <Icon className="Bot" />,
    label: 'Heading 2',
    pinyin: 'heading-2',
    type: 2,
    typeName: 'FORMAT',
    // action: (editor) => editor.chain().focus().toggleCodeBlock().run(),
  },
  {
    isBlock: true,
    icon: <Icon className="Bot" />,
    label: 'Heading 3',
    pinyin: 'heading-3',
    type: 2,
    typeName: 'FORMAT',
    // action: (editor) => editor.chain().focus().toggleCodeBlock().run(),
  },
  {
    isBlock: true,
    icon: <Icon className="Bot" />,
    label: '代码块',
    pinyin: 'daimakuai',
    type: 3,
    typeName: 'INSERT',
    action: editor => editor.chain().focus().toggleCodeBlock().run(),
  },
  {
    isBlock: true,
    icon: <Icon className="Bot" />,
    label: '高亮块',
    pinyin: 'gaoliangkuai',
    type: 3,
    typeName: 'INSERT',
    action: editor => editor.chain().focus().setCallout().run(),
  },
  {
    icon: <Icon className="Bot" />,
    label: '状态',
    pinyin: 'zhuangtai',
    type: 3,
    typeName: 'INSERT',
    action: (editor, user) => editor.chain().focus().setStatus({ defaultShowPicker: true, createUser: user.id }).run(),
  },
  {
    isBlock: true,
    icon: <Icon className="Bot" />,
    label: '流程图',
    pinyin: 'liuchengtu',
    type: 3,
    typeName: 'INSERT',
    action: (editor, user) => {
      editor.chain().focus().setFlow({ width: '100%', defaultShowPicker: true, createUser: user.id }).run();
    },
  },
  {
    isBlock: true,
    icon: <Icon className="Bot" />,
    label: '思维导图',
    pinyin: 'siweidaotu',
    type: 3,
    typeName: 'INSERT',
    action: (editor, user) => {
      editor.chain().focus().setMind({ width: '100%', defaultShowPicker: true, createUser: user.id }).run();
    },
  },
  {
    isBlock: true,
    icon: <Icon className="Bot" />,
    label: '绘图',
    pinyin: 'huitu',
    type: 3,
    typeName: 'INSERT',
    action: (editor, user) => {
      editor.chain().focus().setExcalidraw({ width: '100%', defaultShowPicker: true, createUser: user.id }).run();
    },
  },
];

export const transformToCommands = (commands, data: string[]) => {
  return (data || [])
    .map((label) => {
      return commands.find((command) => {
        if ('title' in command) {
          return false;
        }

        return command.label === label;
      });
    })
    .filter(Boolean);
};
