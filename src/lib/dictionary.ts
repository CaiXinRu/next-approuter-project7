import "server-only";
import type { Locale } from "@/i18n.config";

export const getDictionary = async (locale: Locale, item: string) => {
  const dictionaries = {
    en: () =>
      import(`@/src/dictionaries/en/${item}.json`).then((module) => module.default),
    de: () =>
      import(`@/src/dictionaries/de/${item}.json`).then((module) => module.default),
    zh: () =>
      import(`@/src/dictionaries/zh/${item}.json`).then((module) => module.default),
  }
 return dictionaries[locale]()
};
