import { createInstance, Resource, i18n } from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from '../locales/en/common.json';
import uzTranslation from '../locales/uz/common.json';
import ruTranslation from '../locales/ru/common.json';
import i18nConfig from '../../i18n.config';

const resources: Resource = {
  en: {
    common: enTranslation,
  },
  uz: {
    common: uzTranslation,
  },
  ru: {
    common: ruTranslation,
  },
};

const namespaces = ['common'];

export default async function initTranslations(
  locale: string,
  i18nInstance?: i18n
) {
  const instance = i18nInstance || createInstance();

  instance.use(initReactI18next);

  await instance.init({
    resources,
    lng: locale,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: namespaces[0],
    fallbackNS: namespaces[0],
    ns: namespaces,
    preload: typeof window === 'undefined' ? i18nConfig.locales : [],
  });

  return { i18n: instance, t: instance.t };
}
