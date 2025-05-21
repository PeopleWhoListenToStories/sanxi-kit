import { useTranslations } from 'next-intl';
import { DefaultPageLayout } from '~/components/Layouts/DefaultPageLayout';

export default function NotFound() {
  const t = useTranslations('NotFound');
  return <div className='w-full h-full flex items-center justify-center'>
    <DefaultPageLayout title={t('title')} />
  </div>;
}