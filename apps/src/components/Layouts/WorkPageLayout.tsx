'use client'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '~/components/ui/resizable';
import { Sidebar } from '~/components/SideBar/Sidebar';
import { sideBarLayout, sideBarMinLayout } from '~/helpers/constants';
import { WorkHeader } from '~/components/work/WorkHeader';

interface IProps {
  children: React.ReactNode
}

export const WorkPageLayout = ({ children }: IProps) => {
  return (
    <div className="w-[100vw] h-[100vh] relative bg-background dark:bg-background">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={sideBarLayout[0]} minSize={sideBarMinLayout[0]}>
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle className="w-[1px]" withHandle />
        <ResizablePanel defaultSize={sideBarLayout[1]} minSize={sideBarMinLayout[1]}>
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}