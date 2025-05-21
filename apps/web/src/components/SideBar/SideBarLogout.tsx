'use client'

import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';

interface IProps {
  onLogout: () => void
}

export const SideBarLogout = ({ onLogout }: IProps) => {
  return (
    <>
      <div className="flex justify-start items-center cursor-pointer bg-sidebar-accent text-sidebar-foreground hover:bg-accent rounded-lg px-2 py-1.5" onClick={onLogout}>
        <ArrowRightStartOnRectangleIcon width={24} height={24} />
        <span className="pl-[8px]">退出登录</span>
      </div>
    </>
  )
}
