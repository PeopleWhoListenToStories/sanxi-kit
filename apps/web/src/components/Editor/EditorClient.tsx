'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const Editor = dynamic(() => import('~/components/Editor/Editor'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const EditorClient = React.memo(({ userName, aiToken, ydoc, hasCollab, provider, docId, editable = true }: { userName: string, aiToken?: string; ydoc: Y.Doc | null; docId: string, hasCollab: boolean, editable: boolean, provider?: HocuspocusProvider | null | undefined }) => {
  // const aiState = useAIState()

  // const [isEditable, setIsEditable] = useState(true)
  // const menuContainerRef = useRef(null)

  // const { editor, users, characterCount, collabState, leftSidebar } = useBlockEditor({
  //   aiToken,
  //   ydoc,
  //   provider,
  //   editable,
  //   userName,
  //   onTransaction({ editor }) {
  //     setIsEditable(editor.isEditable)
  //   },
  // })

  // const providerValue = useMemo(() => {
  //   return {
  //     isAiLoading: aiState.isAiLoading,
  //     aiError: aiState.aiError,
  //     setIsAiLoading: aiState.setIsAiLoading,
  //     setAiError: aiState.setAiError,
  //   }
  // }, [aiState])

  // if (!editor || !users) {
  //   return null
  // }

  // const aiLoaderPortal = createPortal(<Loader label="AI is now doing its job." />, document.body)

  return (<> <Editor /> </>
    // <EditorContext.Provider value={providerValue}>
    //   <div className="flex w-full h-full" ref={menuContainerRef}>
    //     <EditorSidebar isOpen={leftSidebar.isOpen} onClose={leftSidebar.close} editor={editor} />
    //     <div className="relative flex flex-col flex-1 h-full overflow-hidden">
    //       <EditorHeader
    //         editor={editor}
    //         collabState={collabState}
    //         users={users}
    //         shareDocId={docId}
    //         editable={editable}
    //         characters={characterCount.characters()}
    //         // users={displayedUsers}
    //         words={characterCount.words()}
    //         isSidebarOpen={leftSidebar.isOpen}
    //         toggleSidebar={leftSidebar.toggle}
    //       />

    //     </div>
    //   </div>
    // {aiState.isAiLoading && aiLoaderPortal} 
    // </EditorContext.Provider>
  )
})


export default EditorClient;