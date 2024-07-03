'use client';
import React, { useState } from 'react';
import useTranslation from '@/hooks/common/useTranslation';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';

const LanguageSelector = () => {
  const t = useTranslations();
  const { locales, currentLocale, handleLocale } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const flags: Record<string, string> = {
    en: '🇺🇸',
    ru: '🇷🇺',
    uz: '🇺🇿',
  };

  const handleSelectClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (locale: string) => {
    handleLocale(locale);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button onClick={handleSelectClick} className="flex items-center w-8">
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <>
            <span className="mr-1">{flags[currentLocale]}</span>
            <span className="uppercase">{currentLocale}</span>
          </>
        )}
      </button>
      {isOpen && (
        <div className="absolute -right-8 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg transition transform duration-500">
          {locales.map((locale) => {
            const isActive = locale === currentLocale;

            return (
              <div
                key={locale}
                onClick={() => handleOptionClick(locale)}
                className={cn(
                  isActive ? 'text-orange-500' : 'text-gray-900',
                  'cursor-pointer px-4 py-2 hover:bg-gray-100'
                )}
              >
                <span className="mr-2">{flags[locale]}</span>
                {t(`Header.languages.${locale}`)}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
