'use client';

import Link from 'next/link';
import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';
import { DefaultPageLayout } from '~/components/Layouts/DefaultPageLayout';
import TypewriterEffect from '~/components/TypewriterEffect';
import { Button } from '~/components/ui/button';
import { BoltIcon, BoltSlashIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation';
import { useAuthStore } from '~/stores/authStore';

type Props = {
  session: Session | null;
};

export default function Index({ session }: Props) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter()
  const { user, logout } = useAuthStore()

  const isLoginUser = session?.user?.name || user?.username


  function onLogoutClick() {
    if (session?.user?.name) {
      signOut();
    } else {
      logout()
    }
  }


  return (
    <DefaultPageLayout title={''}>
      <div className="min-h-screen flex flex-col items-center justify-center py-12 md:py-24 lg:py-32 xl:py-48 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl w-full space-y-8 text-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              {t('Index.slogan')}
            </h1>
            {/* <p className="mt-3 text-base text-muted-foreground sm:mt-5 sm:text-lg">
              <TypewriterEffect text={t('Index.typewriterText')} />
            </p> */}
            <p className="mt-3 text-base text-muted-foreground sm:mt-5 sm:text-lg">
              <TypewriterEffect text={t('LocaleLayout.description')} />
            </p>
          </div>

          <div className="mt-8 flex justify-center space-x-4">
            {isLoginUser ? (
              <div className="space-x-4">
                <Button id="start-using-button" data-umami-event="start-using-button" onClick={() => {
                  if (!isLoginUser) {
                    signIn('github', { callbackUrl: locale + '/work' });
                  } else {
                    router.push(locale + '/work');
                  }
                }}>
                  <div className='flex items-center'>
                    <BoltIcon className='mr-2' /> {t('Index.startUsing')}
                  </div>
                </Button>
                <Button variant="secondary" id="index-logout-button" data-umami-event="index-logout-button" onClick={onLogoutClick}>
                  <div className='flex items-center'> <BoltSlashIcon className='mr-2' /> {t('Index.logout')} </div>
                </Button>
              </div>
            ) : (
              <Button id="index-login-register-button" data-umami-event="index-login-register-button">
                <Link href={locale + '/login'} >
                  {t('Index.loginRegister')}
                </Link>
              </Button>
            )}
          </div>

          <div className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="p-6 bg-card rounded-lg shadow-sm">
              <div className="h-12 w-12 mx-auto bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-foreground text-center">{t('Index.aiWriting')}</h3>
              <p className="mt-2 text-sm text-muted-foreground text-center">{t('Index.aiWritingDesc')}</p>
            </div>

            <div className="p-6 bg-card rounded-lg shadow-sm">
              <div className="h-12 w-12 mx-auto bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-foreground text-center">{t('Index.collaboration')}</h3>
              <p className="mt-2 text-sm text-muted-foreground text-center">{t('Index.collaborationDesc')}</p>
            </div>

            <div className="p-6 bg-card rounded-lg shadow-sm">
              <div className="h-12 w-12 mx-auto bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-foreground text-center">{t('Index.efficient')}</h3>
              <p className="mt-2 text-sm text-muted-foreground text-center">{t('Index.efficientDesc')}</p>
            </div>
          </div>
        </div>
      </div>
    </DefaultPageLayout>
  );
}