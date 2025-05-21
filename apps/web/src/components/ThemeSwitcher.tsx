'use client';

import * as React from 'react';
import { Button } from '~/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useDarkMode } from '~/hooks/useDarkMode';

export const ThemeSwitcher = () => {
  const { isDarkMode, darkMode, lightMode } = useDarkMode()

  const t = useTranslations('common.ThemeSwitcher');

  const onChangeMode = () => {
    if (isDarkMode) {
      lightMode()
    } else {
      darkMode()
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onChangeMode}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">
        {isDarkMode ? t('dark') : t('light')}
      </span>
    </Button>
  );
}