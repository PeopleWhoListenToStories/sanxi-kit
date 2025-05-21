import { useLayoutEffect, useRef, useState } from 'react'
import { HocuspocusProvider } from '@hocuspocus/provider'
import { Doc as YDoc } from 'yjs'
import { useToggle } from './useToggle'
import { AUTH_TOKEN_KEY, AUTH_USER_INFO_KEY, getStorage } from '~/helpers/storage'

type ProviderStatus = 'connecting' | 'connected' | 'disconnected' | 'loadCacheSuccess'

interface CollabProviderProps {
  hasCollab: boolean
  documentId: string
  userId: string
  ydoc: YDoc
  editable: boolean
  docType?: string
}

export const useCollabProvider = ({ hasCollab, documentId, userId, ydoc, editable, docType = 'document' }: CollabProviderProps) => {
  const providerRef = useRef<HocuspocusProvider | null>(null)
  const [provider, setProvider] = useState<HocuspocusProvider | null>(null)
  const [loading, toggleLoading] = useToggle(true)
  const [status, setStatus] = useState<ProviderStatus>('connecting')
  const [error, setError] = useState<Error | null>(null)
  const collabToken = getStorage(AUTH_TOKEN_KEY)

  useLayoutEffect(() => {
    if (hasCollab && collabToken) {
      const _provider = new HocuspocusProvider({
        url: process.env.COLLABORATION_API_URL as string,
        name: documentId,
        document: ydoc,
        token: collabToken,
        parameters: {
          targetId: documentId,
          userId: getStorage(AUTH_USER_INFO_KEY).id,
          docType: 'document',
          editable: true,
        },
        onAwarenessUpdate: ({ states }) => {
          console.log(`%c 🖥️ 🚀 : EditorContent -> states `, `font-size:14px;background-color:#db5c79;color:white;`, states)
        },
        onAuthenticationFailed(e) {
          toggleLoading(false)
          toast({
            title: `提示`,
            description: <div>鉴权失败！暂时无法提供服务 {JSON.stringify(e)}</div>,
          })
        },
        onSynced() {
          toggleLoading(false)
        },
        onStatus({ status }) {
          setStatus(status)
        },
      })
      providerRef.current = _provider
      setProvider(_provider)



      return () => {
        providerRef.current?.disconnect()
      }
    }
  }, [collabToken, documentId, hasCollab, ydoc])

  return {
    provider,
    loading,
    status,
    error
  }
}