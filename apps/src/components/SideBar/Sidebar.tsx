'use client'

import { cn } from '~/helpers/utils'
import { ScrollArea } from '~/components/ui/scroll-area'
import { UserOrSetting } from '~/components/SideBar/UserOrSetting'
import { SideBarLogout } from '~/components/SideBar/SideBarLogout'
import { SideBarNav } from './SideBarNav'
import ExpandableTree from '../ExpandableTree'
import { useAuthStore } from '~/stores/authStore'

interface ISidebarProps {
  className?: string
}

export const Sidebar = ({ className }: ISidebarProps) => {

  const onLogoutHandle = () => {
    const { logout } = useAuthStore.getState()
    logout()
    window.location.href = '/'
  }

  return (
    <div className={cn('h-full w-full flex flex-col bg-sidebar-accent text-sidebar-foreground', className)}>
      <ScrollArea className="flex-1">
        <div className="flex flex-col h-screen p-2">
          <div className='flex-1'>
            <UserOrSetting />
            <SideBarNav />
            <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full my-2"></div>
            <div className="mt-4">
              <ExpandableTree />
              {/* <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-accent cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  📁
                </div>
                <span>我的文档</span>
              </div>
              <div className="ml-8 mt-2">
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-accent cursor-pointer">
                  <span>刘水</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-accent cursor-pointer">
                  <span>无标题</span>
                </div>
              </div> */}
            </div>
          </div>
          <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full my-2"></div>
          <SideBarLogout onLogout={onLogoutHandle} />
        </div>
      </ScrollArea>
    </div>
  )
}