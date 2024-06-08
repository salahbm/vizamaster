import { PropsWithChildren } from 'react';

import TranslationsProvider from './TranslationsProvider';

const AppProvider = ({ children }: PropsWithChildren) => {
  return <TranslationsProvider>{children}</TranslationsProvider>;
};

export default AppProvider;
