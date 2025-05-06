import React, { useMemo, useRef, useState } from 'react'
// import { EditorContent } from '@sanxi-kit/react'
import * as Y from 'yjs'
import { HocuspocusProvider } from '@hocuspocus/provider'

// import { ColumnsMenu } from '~/extensions/MultiColumn/menus'
import { EditorContext } from '~/context/EditorContext'
import { TableColumnMenu, TableRowMenu } from '~/extensions/Table/menus'
import { ContentItemMenu } from '~/components/Menus/ContentItemMenu'
import { useBlockEditor } from '~/hooks/useBlockEditor'
import { useAIState } from '~/hooks/useAIState'
import { LinkMenu } from '~/components/Menus/LinkMenu'
import { TextMenu } from '~/components/Menus/TextMenu'
import ImageBlockMenu from '~/extensions/ImageBlock/components/ImageBlockMenu'
import { EditorSidebar } from '~/components/BlockEditor/components/EditorSidebar'
import { EditorHeader } from '~/components/BlockEditor/components/EditorHeader'
import Editor from '~/components/Editor/Editor';

import '~/styles/editor.css'
import "~/styles/components/index.scss"
import Loader from '~/components/ui/loader'
import { createPortal } from 'react-dom'

// eslint-disable-next-line react/display-name
export const BlockEditor = React.memo(({ userName, aiToken, ydoc, hasCollab, provider, docId, editable = true }: { userName: string, aiToken?: string; ydoc: Y.Doc | null; docId: string, hasCollab: boolean, editable: boolean, provider?: HocuspocusProvider | null | undefined }) => {
  const aiState = useAIState()
  
  const [isEditable, setIsEditable] = useState(true)
  const menuContainerRef = useRef(null)

  const { editor, users, characterCount, collabState, leftSidebar } = useBlockEditor({
    aiToken,
    ydoc,
    provider,
    editable,
    userName,
    onTransaction({ editor }) {
      setIsEditable(editor.isEditable)
    },
  })

  const providerValue = useMemo(() => {
    return {
      isAiLoading: aiState.isAiLoading,
      aiError: aiState.aiError,
      setIsAiLoading: aiState.setIsAiLoading,
      setAiError: aiState.setAiError,
    }
  }, [aiState])

  if (!editor || !users) {
    return null
  }

  const aiLoaderPortal = createPortal(<Loader label="AI is now doing its job." />, document.body)

  return (
    <EditorContext.Provider value={providerValue}>
      <div className="flex w-full h-full" ref={menuContainerRef}>
        <EditorSidebar isOpen={leftSidebar.isOpen} onClose={leftSidebar.close} editor={editor} />
        <div className="relative flex flex-col flex-1 h-full overflow-hidden">
          <EditorHeader
            editor={editor}
            collabState={collabState}
            users={users}
            shareDocId={docId}
            editable={editable}
            characters={characterCount.characters()}
            // users={displayedUsers}
            words={characterCount.words()}
            isSidebarOpen={leftSidebar.isOpen}
            toggleSidebar={leftSidebar.toggle}
          />
          <Editor userName={userName} docId={docId} editable={true} aiToken={aiToken ?? undefined} hasCollab={true} ydoc={ydoc} provider={provider} /> 
          {/* <EditorContent editor={editor} className="flex-1 overflow-y-auto" /> */}
          <ContentItemMenu editor={editor} isEditable={isEditable} />
          <LinkMenu editor={editor} appendTo={menuContainerRef} />
          <TextMenu editor={editor} />
          {/* <ColumnsMenu editor={editor} appendTo={menuContainerRef} /> */}
          <TableRowMenu editor={editor} appendTo={menuContainerRef} />
          <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
          <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
          <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
        </div>
      </div>
      {aiState.isAiLoading && aiLoaderPortal}
    </EditorContext.Provider>
  )
})