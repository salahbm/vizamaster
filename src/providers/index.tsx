import React, { PropsWithChildren } from 'react';

import TranslationsProvider from './TranslationsProvider';
import { Params } from '@/types/global';

const AppProvider = ({
  children,
  locale,
}: PropsWithChildren<Params['params']>) => (
  <TranslationsProvider locale={locale}>{children}</TranslationsProvider>
);

export default AppProvider;
