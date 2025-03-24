import { HocuspocusProvider } from '@hocuspocus/provider'
import { useEffect, useState } from 'react'
import { Doc as YDoc } from 'yjs'
import { ProviderStatus } from '~/components/work/WorkEditorContent';
import { useToggle } from './useToggle';

interface CollabProviderProps { token: string, docId: string; userId: string, editable?: boolean, enabled?: boolean, type?: string }

export const useCollaboration = ({ token, docId, userId, enabled = true, editable = false, type = 'document' }: CollabProviderProps) => {
  const [providerState, setProviderState] = useState<
    | { state: 'loading' | 'idle'; provider: null; yDoc: null }
    | { state: 'loaded'; provider: HocuspocusProvider; yDoc: YDoc }
  >(() => ({ state: enabled ? 'loading' : 'idle', provider: null, yDoc: null }))
  const [status, setStatus] = useState<ProviderStatus>('connecting')
  const [error, setError] = useState<string>();
  const [loading, toggleLoading] = useToggle(true)

  // const collabToken = getStorage(AUTH_TOKEN_KEY)

  const getProvider = ({ docId, token, yDoc }) => {
    return new HocuspocusProvider({
      url: process.env.COLLABORATION_API_URL as string || 'ws://110.40.181.43:30053/',
      name: docId,
      document: yDoc,
      token, // (user && user.token) || 'read-public',
      parameters: {
        targetId: docId,
        userId,
        docType: type,
        editable,
      },
      // maxAttempts: 1,
      onAwarenessUpdate: ({ states }) => {
        // const users = states.map(state => ({ clientId: state.clientId, user: state.user }));
        // if (deepEqual(user, lastAwarenessRef.current)) {
        //   return;
        // }
        // onAwarenessUpdate && onAwarenessUpdate(users);
        // lastAwarenessRef.current = users;
      },
      onAuthenticationFailed(e) {
        toggleLoading(false);
        setError(e || new Error('鉴权失败！暂时无法提供服务'));
      },
      onSynced() {
        toggleLoading(false);
      },
      onStatus({ status }) {
        setStatus(status)
      },
    } as any);
  };

  useEffect(() => {
    let isMounted = true

    const dataFetch = async () => {
      try {
        setProviderState(prev =>
          // Start loading if not already
          prev.state === 'loading'
            ? prev
            : {
              state: 'loading',
              provider: null,
              yDoc: null,
            },
        )

        // Get the collaboration token from the backend
        // const response = await fetch('/api/collaboration', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // })

        // if (!response.ok) {
        //   throw new Error('No collaboration token provided, please set TIPTAP_COLLAB_SECRET in your environment')
        // }

        if (!isMounted) {
          return
        }

        const yDoc = new YDoc()
        // set state when the data received、
        setProviderState({ state: 'loaded', provider: getProvider({ docId, token, yDoc }), yDoc })
      } catch (e) {
        if (e instanceof Error) {
          console.error(e.message)
        }
        if (!isMounted) {
          return
        }
        setProviderState({ state: 'idle', provider: null, yDoc: null })
        return
      }
    }

    // If enabled, fetch the data
    if (enabled) {
      dataFetch()
    }

    return () => {
      isMounted = false
    }
  }, [docId, enabled])

  return { providerState, error, status, loading }
}