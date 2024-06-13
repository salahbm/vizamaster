import { PropsWithChildren } from 'react';

import TranslationsProvider from './TranslationsProvider';
import ThemeProviders from './ThemeProvider';
import { ClerkProvider } from '@clerk/nextjs';

const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <TranslationsProvider>
      <ThemeProviders>{children}</ThemeProviders>
    </TranslationsProvider>
  );
};

export default AppProvider;
