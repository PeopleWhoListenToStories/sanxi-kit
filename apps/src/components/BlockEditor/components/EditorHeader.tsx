import { WebSocketStatus } from '@hocuspocus/provider'
import { useTranslations } from 'next-intl'

import { EditorUser } from '../types'
import { EditorInfo } from './EditorInfo'

import { Icon } from '~/components/ui/icon'
import { toast } from '~/components/ui/use-toast'
import { Toolbar } from '~/components/ui/toolbar'
import { copy } from '~/helpers/copy'
import { AUTH_TOKEN_KEY, AUTH_USER_KEY, getStorage } from '~/helpers/storage'
import { WorkHeader } from '~/components/work/WorkHeader'

export type EditorHeaderProps = {
  editable?: boolean
  isSidebarOpen?: boolean
  toggleSidebar?: () => void
  shareDocId?: string
  characters: number
  words: number
  collabState: WebSocketStatus
  users: EditorUser[]
}

export const EditorHeader = ({
  editable = false,
  characters,
  collabState,
  shareDocId,
  users,
  words,
  isSidebarOpen,
  toggleSidebar,
}: EditorHeaderProps) => {
  const t = useTranslations()

  const handleCopyAction = async () => {
    const shareUrl = `${window.location.origin}/share/${shareDocId}?userId=${getStorage(AUTH_USER_KEY)}&token=${getStorage(AUTH_TOKEN_KEY)}`
    if (Math.random() > 0.5) {
      copy(`${shareUrl}`, () => {
        toast({
          description: <div>{t('global.copySuccess')}</div>,
        })
      })
    } else {
      try {
        const params = new URLSearchParams({ url: shareUrl });
        const { code, data } = await (await fetch(`/short-url?${params}`, { method: 'GET' })).json()

        if (code === 200 && data) {
          copy(`${process.env.NEXT_PUBLIC_SHORT_URL}/${data}`, () => {
            toast({
              description: <div>{t('global.copySuccess')}</div>,
            })
          })
        } else {
          toast({
            description: <div>{t('global.copyFail')}</div>,
          })
        }
      } catch (err) {
        toast({
          description: <div>{t('global.copyFail')}</div>,
        })
      }
    }
  }

  return (
    <WorkHeader leftNode={
      <div className="flex flex-row items-center justify-between flex-none px-2">
        <div className="flex items-center gap-x-1.5">
          <Toolbar.Button
            tooltip={isSidebarOpen ? t('globalEditor.closeSidebar') : t('globalEditor.openSidebar')}
            onClick={toggleSidebar}
            active={isSidebarOpen}
            className={isSidebarOpen ? 'bg-transparent' : ''}
          >
            <Icon name={isSidebarOpen ? 'PanelLeftClose' : 'PanelLeft'} />
          </Toolbar.Button>
        </div>
        <div className="flex flex-row items-center gap-x-1.5">
          {editable && shareDocId && (
            <div className="flex items-center gap-x-1.5">
              <Toolbar.Button
                tooltip={t('globalEditor.shareLink')}
                onClick={() => handleCopyAction()}
                className={'bg-transparent'}
              >
                <Icon name={'Link'} />
              </Toolbar.Button>
            </div>
          )}
        </div>
        <EditorInfo characters={characters} words={words} collabState={collabState} users={users} />
      </div>
    }
    />
  )
}
