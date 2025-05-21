import { LocaleSwitcher } from '~/components/LocaleSwitcher';
import { ThemeSwitcher } from '~/components/ThemeSwitcher';
import { redirect } from '~/i18n/navigation'

export const WorkHeader = ({ leftNode, rightNode }: { leftNode?: React.ReactNode; rightNode?: React.ReactNode }) => {
  const toHome = () => {
    redirect({
      href: '/',
      locale: ''
    });
  }
  return (
    <div className="flex text-secondary-foreground my-1 mx-3 bg-ground pb-1">
      <div className='text-start inline-flex items-center'>
        <h1 className="font-bold text-xl bg-muted flex" id="index-logo-button" data-umami-event="index-logo-button" onClick={toHome}>
          <span>&nbsp; 三喜 &nbsp;</span>
          <span className="text-background bg-foreground">&nbsp;AI&nbsp;</span>
        </h1>
        {leftNode ?? leftNode}
      </div>
      <div className='flex-1 text-end'>
        <div className='inline-flex items-center'>
          {rightNode ?? rightNode}
          <LocaleSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  )
}