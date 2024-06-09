import { PropsWithChildren } from 'react';

import TranslationsProvider from './TranslationsProvider';
import ThemeProviders from './ThemeProvider';

const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <TranslationsProvider>
      <ThemeProviders>{children}</ThemeProviders>
    </TranslationsProvider>
  );
};

export default AppProvider;
