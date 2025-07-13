'use client';

import React from 'react';
import useTranslation from '@/hooks/common/useTranslation';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { Check, Globe } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

const LanguageSelector = () => {
  const t = useTranslations();
  const { locales, currentLocale, handleLocale } = useTranslation();

  const flags: Record<string, string> = {
    en: '🇺🇸',
    ru: '🇷🇺',
    uz: '🇺🇿',
  };

  const handleOptionClick = (locale: string) => {
    handleLocale(locale);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 h-8 px-2 hover:bg-accent hover:text-accent-foreground"
          aria-label="Select language"
        >
          <span className="mr-1 text-base">{flags[currentLocale]}</span>
          <span className="uppercase text-xs font-medium">{currentLocale}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-0" align="end" sideOffset={8}>
        <div className="py-1">
          {locales.map((locale) => {
            const isActive = locale === currentLocale;

            return (
              <div
                key={locale}
                onClick={() => handleOptionClick(locale)}
                className={cn(
                  'flex items-center justify-between cursor-pointer px-3 py-2 hover:bg-accent hover:text-accent-foreground transition-colors',
                  isActive
                    ? 'text-primary font-medium bg-accent/50'
                    : 'text-foreground'
                )}
                role="button"
                tabIndex={0}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{flags[locale]}</span>
                  <span>{t(`Header.languages.${locale}`)}</span>
                </div>
                {isActive && <Check className="h-4 w-4" />}
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LanguageSelector;
