import {useTranslations} from 'next-intl';
import NavigationLink from './NavigationLink';
import ImageUploader from './ImageUploader';

export default function Navigation() {
  const t = useTranslations('Navigation');

  return (
    <nav style={{display: 'flex', gap: 10, alignItems: 'center'}}>
      <ImageUploader />
      <NavigationLink href="/">{t('home')}</NavigationLink>
      <NavigationLink href="/client">{t('client')}</NavigationLink>
      <NavigationLink href="/about">{t('about')}</NavigationLink>
      <NavigationLink href="/nested">{t('nested')}</NavigationLink>
      <NavigationLink
        href={{pathname: '/news/[articleId]', params: {articleId: 3}}}
      >
        {t('newsArticle', {articleId: String(3)})}
      </NavigationLink>
    </nav>
  );
}