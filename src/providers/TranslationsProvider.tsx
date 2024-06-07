'use client';

import { PropsWithChildren } from 'react';
import { I18nextProvider } from 'react-i18next';
import { createInstance, i18n as i18nInterface } from 'i18next';
import initTranslations from '@/app/i18n';
import { Params } from '@/types/global';
import Cookies from 'js-cookie';

export default function TranslationsProvider({
  children,
  locale,
}: PropsWithChildren<Params['params']>) {
  const i18n = createInstance() as i18nInterface;
  const savedLocale = Cookies.get('NEXT_LOCALE') || locale;

  initTranslations(savedLocale, i18n);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
