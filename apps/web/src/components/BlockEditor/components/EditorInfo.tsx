import { memo } from 'react'

import { WebSocketStatus } from '@hocuspocus/provider'
import { useTranslations } from 'next-intl'
import { EditorUser } from '../types'

import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip'
import { cn } from '~/helpers/utils'
import { getConnectionText } from '~/helpers/utils/getConnectionText'

export type EditorInfoProps = {
  characters: number
  words: number
  collabState: WebSocketStatus
  users: EditorUser[]
}

export const EditorInfo = memo(({ characters, collabState, users, words }: EditorInfoProps) => {
  const t = useTranslations('globalEditor')

  return (
    <div className="flex items-center ml-1">
      {collabState === 'connected' && (
        <div className="flex flex-row items-center gap-2">
          <div className="relative flex flex-row items-center ml-3">
            {users.map((user: EditorUser) => (
              <div key={user.clientId} className="-ml-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <img
                      className="w-8 h-8 border border-white rounded-full dark:border-black"
                      src={`${process.env.NEXT_PUBLIC_AVATAR_URL}&seed=${user?.name}&backgroundColor=${user.color ? user.color.replace('#', '') : null}`}
                      alt="avatar"
                    />
                  </TooltipTrigger>
                  <TooltipContent className="bg-white text-black border border-gray-300 shadow-md">
                    <p>{user.name}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            ))}
            {users.length > 3 && (
              <div className="-ml-3">
                <div className="flex items-center justify-center w-8 h-8 font-bold text-xs leading-none border border-white dark:border-black bg-[#FFA2A2] rounded-full">
                  +{users.length - 3}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="flex items-center gap-2 mx-2">
        <div
          className={cn('w-2 h-2 rounded-full', {
            'bg-yellow-500 dark:bg-yellow-400': collabState === 'connecting',
            'bg-green-500 dark:bg-green-400': collabState === 'connected',
            'bg-red-500 dark:bg-red-400': collabState === 'disconnected',
          })}
        />
        <span className="max-w-[4rem] text-xs text-neutral-500 dark:text-neutral-400 font-semibold">
          {t(getConnectionText(collabState))}
        </span>
      </div>
      <div className="flex flex-col justify-center pl-2 mx-2 text-right border-l border-neutral-200 dark:border-neutral-800">
        <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
          {words || 0} {t('words')}
        </div>
        <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
          {t('characters', { count: characters || 0 })}
        </div>
      </div>
    </div>
  )
})

EditorInfo.displayName = 'EditorInfo'
