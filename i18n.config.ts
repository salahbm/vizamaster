import { Config } from 'next-i18n-router/dist/types'

const i18nConfig: Config = {
	locales: ['en', 'ja', 'zh', 'es', 'fr'],
	defaultLocale: 'en',
	routingStrategy: 'dynamicSegment' as const,
	prefixDefault: true,
	localeDetector: false as const,
}

export default i18nConfig
