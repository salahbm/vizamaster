// import { usePathname, useRouter } from 'next/navigation';
// import { useCallback } from 'react';

// import i18nConfig from '../../../i18n.config';
// import { useTranslations } from 'next-intl';

// const useLocale = () => {
//   const i18n  = useTranslations();
//   const currentLocale = i18n.language;
//   const router = useRouter();
//   const currentPathname = usePathname();

//   const handleLocale = useCallback(
//     (newLocale: string) => {
//       if (newLocale === currentLocale) return;

//       // Save to localStorage
//       localStorage.setItem('NEXT_LOCALE', newLocale);

//       const newPath =
//         currentLocale === i18nConfig.defaultLocale && !i18nConfig.prefixDefault
//           ? `/${newLocale}${currentPathname}`
//           : currentPathname.replace(`/${currentLocale}`, `/${newLocale}`);

//       router.push(newPath);

//       // For making a new request to the server, re-fetching data requests, and re-rendering Server Components.
//       router.refresh();
//     },
//     [currentLocale, currentPathname, router]
//   );

//   return { locales: i18nConfig.locales, currentLocale, handleLocale };
// };

// export default useLocale;
