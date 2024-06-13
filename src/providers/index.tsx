import { PropsWithChildren } from 'react';

import TranslationsProvider from './TranslationsProvider';
import ThemeProviders from './ThemeProvider';
import { ClerkProvider } from '@clerk/nextjs';

const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <TranslationsProvider>
      <ClerkProvider>
        <ThemeProviders>{children}</ThemeProviders>
      </ClerkProvider>
    </TranslationsProvider>
  );
};

export default AppProvider;
