import { useLocale, useTranslations } from 'next-intl';
import { locales } from '~/i18n/config';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';

export const LocaleSwitcher = () => {
  const t = useTranslations('common.LocaleSwitcher');
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect
      defaultValue={locale}
      items={locales.map(v => ({ label: t(v), value: v }))}
      label={t('label')}
    />
  );
}