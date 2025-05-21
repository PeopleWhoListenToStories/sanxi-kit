'use client'

import { useSearchParams } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { useCollaboration } from '~/hooks/useCollaboration'
import { BlockEditor } from '~/components/BlockEditor/BlockEditor'
import { useMount } from '~/hooks/useMount'

export const WorkEditorContent = React.memo(({ documentId, userId, userName, token }: { token: string, documentId: string, userName: string, userId: string }) => {
  const [aiToken, setAiToken] = useState<string>('')
  const searchParams = useSearchParams()
  const mounted = useMount();

  useEffect(() => {
    setAiToken(process.env.NEXT_PUBLIC_OPENAI_API_KEY || '')
  }, [])

  const collabParams = useMemo(() => ({
    token,
    docId: documentId,
    userId,
    hasCollab: Boolean(parseInt(searchParams?.get('noCollab') as string) !== 1),
    editable: true,
  }), [token, documentId, userId, searchParams])

  const { providerState } = useCollaboration(collabParams)

  if (providerState.state === "loading") {
    return <div>loading</div>
  }

  if (providerState.state === "idle") {
    return <div>idle</div>
  }

  return (
    <>
      { mounted && (<BlockEditor userName={userName} docId={documentId} aiToken={aiToken ?? undefined} ydoc={providerState.yDoc} provider={providerState.provider} />)}
    </>
  )
})

WorkEditorContent.displayName = 'WorkEditorContent'