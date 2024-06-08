const i18nConfig = {
  locales: ['en', 'uz', 'ru'],
  defaultLocale: 'ru',
  routingStrategy: 'dynamicSegment' as const,
  prefixDefault: true,
  localeDetector: false as const,
};

export default i18nConfig;
