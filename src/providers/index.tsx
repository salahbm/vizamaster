import { PropsWithChildren } from 'react';

import TranslationsProvider from './TranslationsProvider';
import ThemeProviders from './ThemeProvider';
import QueryProvider from './QueryProvider';

const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <TranslationsProvider>
      <QueryProvider>
        <ThemeProviders>{children}</ThemeProviders>
      </QueryProvider>
    </TranslationsProvider>
  );
};

export default AppProvider;
