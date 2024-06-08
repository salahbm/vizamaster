import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { defaultLocale, locales } from '../../../i18n.config';

const useTranslation = () => {
  const router = useRouter();
  const currentPathname = usePathname();
  const currentLocale = useLocale();

  const handleLocale = useCallback(
    (newLocale: string) => {
      if (newLocale === currentLocale) return;

      // Save to localStorage
      localStorage.setItem('NEXT_LOCALE', newLocale);

      let newPath;
      if (
        currentLocale === defaultLocale &&
        !currentPathname.startsWith(`/${defaultLocale}`)
      ) {
        // Prepend the new locale if the current locale is the default and the path doesn't start with the default locale
        newPath = `/${newLocale}${currentPathname}`;
      } else {
        // Replace the current locale with the new locale in the path
        newPath = currentPathname.replace(
          new RegExp(`^/${currentLocale}`),
          `/${newLocale}`
        );
      }

      // Ensure the new path is properly formatted
      newPath = newPath.replace(/\/{2,}/g, '/');

      router.push(newPath);

      // For making a new request to the server, re-fetching data requests, and re-rendering Server Components.
      router.refresh();
    },
    [currentLocale, currentPathname, router]
  );

  return { locales, currentLocale, handleLocale };
};

export default useTranslation;
