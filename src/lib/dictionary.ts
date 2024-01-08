import "server-only";
import type { Locale } from "@/i18n.config";

const dictionaries = {
  en: () =>
    import("@/src/dictionaries/en.json").then((module) => module.default),
  de: () =>
    import("@/src/dictionaries/de.json").then((module) => module.default),
  zh: () =>
    import("@/src/dictionaries/zh.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
