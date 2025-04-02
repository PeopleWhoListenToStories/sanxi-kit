'use client'

import { WorkPageLayout } from '~/components/Layouts/WorkPageLayout'
import { WorkEditorContent } from '~/components/work/WorkEditorContent'
import { useAuthStore } from '~/stores/authStore'
import React, { useEffect, useState } from 'react'

const Document = React.memo(({ params }: { params: { documentId: string } }) => {
  const { token, user } = useAuthStore()
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    setShouldRender(true)
  }, [])

  return (
    <WorkPageLayout>
      {shouldRender && <WorkEditorContent token={token} userId={user.userId} userName={user.username} documentId={params.documentId} />}
    </WorkPageLayout>
  )
})

Document.displayName = 'Document'

export default Document
