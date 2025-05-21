import type { HocuspocusProvider } from '@hocuspocus/provider';
import type { Editor } from '@sanxi-kit/react';
import type { Doc as YDoc } from 'yjs';

import type { EditorUser } from '~/components/BlockEditor/types';
import { WebSocketStatus } from '@hocuspocus/provider';
// import Collaboration from "@tiptap/extension-collaboration";
// import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import Ai from '@sanxi-kit/ai';
import { useEditor } from '@sanxi-kit/react';

import { useContext, useEffect, useMemo, useState } from 'react';
import { EditorContext } from '~/context/EditorContext';
import { Collaboration } from '~/extensions/Collaboration';
import { CollaborationCursor } from '~/extensions/CollaborationCursor';

import { ExtensionKit } from '~/extensions/extension-kit';
import { getRandomColor } from '~/helpers/color';
import { initialContent } from '~/helpers/data/initialContent';
import { useSidebar } from './useSidebar';

const TIPTAP_AI_APP_ID = process.env.NEXT_PUBLIC_TIPTAP_AI_APP_ID;
const TIPTAP_AI_TOKEN = process.env.NEXT_PUBLIC_TIPTAP_AI_TOKEN;
const TIPTAP_AI_BASE_URL = process.env.NEXT_PUBLIC_TIPTAP_AI_BASE_URL;

declare global {
  interface Window {
    editor: Editor | null;
  }
}

export const useBlockEditor = ({
  aiToken,
  ydoc,
  provider,
  userId,
  userName,
  ...editorOptions
}: {
  aiToken?: string
  ydoc: YDoc | null
  provider?: HocuspocusProvider | null | undefined
  userId?: string
  userName: string
} & Partial<Omit<EditorOptions, 'extensions'>>) => {
  const [collabState, setCollabState] = useState<WebSocketStatus>(
    provider ? WebSocketStatus.Connecting : WebSocketStatus.Disconnected,
  )

  const leftSidebar = useSidebar();
  // const [collabState, setCollabState] = useState<WebSocketStatus>(WebSocketStatus.Connecting);
  const { setIsAiLoading, setAiError } = useContext(EditorContext);

  // const editorConfig = useMemo(() => ({
  //   editable,
  //   editorProps: {
  //     taskItemClickable: true,
  //     attributes: {
  //       autocomplete: 'off',
  //       autocorrect: 'off',
  //       autocapitalize: 'off',
  //       class: 'min-h-full',
  //     },
  //   },
  //   autofocus: true,
  //   onCreate: ({ editor }) => {
  //     hocuspocusProvider?.on('synced', () => {
  //       if (editor.isEmpty) {
  //         editor.commands.setContent(emptyContent);
  //       }
  //     });
  //   },
  //   extensions: [
  //     ...ExtensionKit({
  //       provider: hocuspocusProvider,
  //     }),
  //     Collaboration.configure({
  //       document: ydoc,
  //     }),
  //     CollaborationCursor.configure({
  //       provider: hocuspocusProvider,
  //       user: {
  //         ...(user || {
  //           name: '访客',
  //         }),
  //         color: getRandomColor(),
  //       },
  //     }),
  //     Ai.configure({
  //       appId: TIPTAP_AI_APP_ID,
  //       token: TIPTAP_AI_TOKEN || aiToken,
  //       baseUrl: TIPTAP_AI_BASE_URL,
  //       autocompletion: true,
  //       onLoading: () => {
  //         setIsAiLoading(true);
  //         setAiError(null);
  //       },
  //       onSuccess: () => {
  //         setIsAiLoading(false);
  //         setAiError(null);
  //       },
  //       onError: (error) => {
  //         setIsAiLoading(false);
  //         setAiError(error.message);
  //       },
  //     }),
  //   ],
  // }), [editable, hocuspocusProvider, ydoc, user, aiToken]);

  // const editor = useEditor(
  //     editorConfig,
  //     editable,
  //     editorProps: {
  //       taskItemClickable: true,
  //       attributes: {
  //         autocomplete: 'off',
  //         autocorrect: 'off',
  //         autocapitalize: 'off',
  //         class: 'min-h-full',
  //         // class: 'is-withauthor',
  //       },
  //     },
  //     autofocus: true,
  //     onCreate: ({ editor }) => {
  //       hocuspocusProvider?.on('synced', () => {
  //         if (editor.isEmpty) {
  //           editor.commands.setContent(emptyContent);
  //         }
  //       });
  //     },
  //     extensions: [
  //       ...ExtensionKit({
  //         provider: hocuspocusProvider,
  //       }),
  //       Collaboration.configure({
  //         document: ydoc,
  //       }),
  //       CollaborationCursor.configure({
  //         provider: hocuspocusProvider,
  //         user: {
  //           ...(user || {
  //             name: '访客',
  //           }),
  //           color: getRandomColor(),
  //         },
  //       }),
  //       Ai.configure({
  //         appId: TIPTAP_AI_APP_ID,
  //         token: TIPTAP_AI_TOKEN || aiToken,
  //         baseUrl: TIPTAP_AI_BASE_URL,
  //         autocompletion: true,
  //         onLoading: () => {
  //           setIsAiLoading(true);
  //           setAiError(null);
  //         },
  //         onSuccess: () => {
  //           setIsAiLoading(false);
  //           setAiError(null);
  //         },
  //         onError: (error) => {
  //           setIsAiLoading(false);
  //           setAiError(error.message);
  //         },
  //       }),
  //     ].filter(Boolean),
  //   },
  //   [ydoc, hocuspocusProvider],
  // );
  const editor = useEditor(
    {
      ...editorOptions,
      immediatelyRender: true,
      shouldRerenderOnTransaction: false,
      autofocus: true,
      onCreate: ({ editor }) => {
        if (provider && !provider.isSynced) {
          provider.on('synced', () => {
            setTimeout(() => {
              if (editor.isEmpty) {
                editor.commands.setContent(initialContent)
              }
            }, 0)
          })
        } else if (editor.isEmpty) {
          editor.commands.setContent(initialContent)
          editor.commands.focus('start', { scrollIntoView: true })
        }
      },
      extensions: [
        ...ExtensionKit({
          provider,
        }),
        Collaboration.configure({
          document: ydoc,
        }),
        CollaborationCursor.configure({
          provider,
          user: {
            name: userName,
            color: getRandomColor(),
          },
        }),
        Ai.configure({
          appId: TIPTAP_AI_APP_ID,
          token: TIPTAP_AI_TOKEN || aiToken,
          baseUrl: TIPTAP_AI_BASE_URL,
          autocompletion: true,
          onLoading: () => {
            setIsAiLoading(true);
            setAiError(null);
          },
          onSuccess: () => {
            setIsAiLoading(false);
            setAiError(null);
          },
          onError: (error) => {
            setIsAiLoading(false);
            setAiError(error.message);
          },
        }),
      ].filter(Boolean),
      editorProps: {
        taskItemClickable: true,
        attributes: {
          autocomplete: 'off',
          autocorrect: 'off',
          autocapitalize: 'off',
          class: 'min-h-full',
        },
      },
    },
    [ydoc, provider],
  )

  const users = useMemo(() => {
    if (!editor?.storage.collaborationCursor?.users) {
      return [];
    }

    return editor.storage.collaborationCursor?.users.map((user: EditorUser) => {
      const names = user.name?.split(' ');
      const firstName = names?.[0];
      const lastName = names?.[names.length - 1];
      const initials = `${firstName?.[0] || '?'}${lastName?.[0] || '?'}`;

      return { ...user, initials: initials.length ? initials : '?' };
    });
  }, [editor?.storage.collaborationCursor?.users]);

  // const users = useEditorState({
  //   editor,
  //   selector: (ctx): (EditorUser & { initials: string })[] => {
  //     if (!ctx.editor?.storage.collaborationCursor?.users) {
  //       return []
  //     }

  //     return ctx.editor.storage.collaborationCursor.users.map((user: EditorUser) => {
  //       const names = user.name?.split(' ')
  //       const firstName = names?.[0]
  //       const lastName = names?.[names.length - 1]
  //       const initials = `${firstName?.[0] || '?'}${lastName?.[0] || '?'}`

  //       return { ...user, initials: initials.length ? initials : '?' }
  //     })
  //   },
  // })

  const characterCount = editor?.storage.characterCount || {
    characters: () => 0,
    words: () => 0,
  };

  // useEffect(() => {
  //   hocuspocusProvider?.on('status', (event: { status: WebSocketStatus }) => {
  //     setCollabState(event.status);
  //   });
  // }, [hocuspocusProvider]);

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     window.editor = editor;
  //   }
  // }, [editor]);

  useEffect(() => {
    provider?.on('status', (event: { status: WebSocketStatus }) => {
      setCollabState(event.status)
    })
  }, [provider])

  window.editor = editor

  return { editor, users, collabState, characterCount, leftSidebar }

};
