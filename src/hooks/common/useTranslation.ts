import { routing } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

/**
 * Custom hook for handling translations and locale switching
 * @returns Object containing locales, currentLocale, and handleLocale function
 */
const useTranslation = () => {
  const router = useRouter();
  const currentPathname = usePathname();
  const currentLocale = useLocale();
  const { defaultLocale, locales } = routing;

  // Sync locale with localStorage on mount
  useEffect(() => {
    localStorage.setItem('NEXT_LOCALE', currentLocale);
  }, [currentLocale]);

  /**
   * Handle locale change and update URL accordingly
   */
  const handleLocale = useCallback(
    (newLocale: string) => {
      // Skip if the locale is the same
      if (!newLocale || newLocale === currentLocale) return;

      // Validate locale
      if (!locales.includes(newLocale as 'en' | 'ru' | 'uz')) {
        console.error(`Invalid locale: ${newLocale}`);
        return;
      }

      try {
        // With localePrefix: 'always', we can use a simpler approach
        // Extract the path without the locale prefix
        const pathWithoutLocale = currentPathname
          .replace(new RegExp(`^/${currentLocale}`), '')
          .replace(/^\/+/, '/'); // Ensure it starts with a single slash

        // Construct the new path with the new locale
        const newPath = `/${newLocale}${pathWithoutLocale}`;

        // Update the URL
        router.push(newPath);
        router.refresh();
      } catch (error) {
        console.error('Error changing locale:', error);
      }
    },
    [currentLocale, currentPathname, router, locales]
  );

  return {
    locales,
    currentLocale,
    handleLocale,
    isDefaultLocale: currentLocale === defaultLocale,
  };
};

export default useTranslation;
