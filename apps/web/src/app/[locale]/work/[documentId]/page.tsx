'use client'

import { WorkPageLayout } from '~/components/Layouts/WorkPageLayout'
import { WorkEditorContent } from '~/components/work/WorkEditorContent'
import { useAuthStore } from '~/stores/authStore'
import React, { useEffect, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Document = React.memo(({ params }: any) => {
  const { token, user } = useAuthStore()
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    setShouldRender(true)
  }, [])

  return (
    <WorkPageLayout>
      {shouldRender && <WorkEditorContent token={token + ''} userId={user.userId} userName={user.username} documentId={params.documentId} />}
    </WorkPageLayout>
  )
})

Document.displayName = 'Document'

export default Document
