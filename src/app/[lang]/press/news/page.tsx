import { Locale } from "@/i18n.config";
import { getDictionary } from "@/src/lib/dictionary";
import type { Metadata } from "next";

export const metadata: Metadata = {
  //   title: { absolute: "Press" },
  alternates: {
    // canonical: "/press",
    languages: {
      zh: "http://localhost:3001/zh/press/news",
      de: "http://localhost:3001/de/press/news",
      en: "http://localhost:3001/en/press/news",
    },
  },
};

export default async function Press({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const i = await getDictionary(lang, "press_news");

  return (
    <section className="py-24">
      <div className="container">
        <h1 className="text-3xl font-bold">{i.title}</h1>
        <p className="text-gray-500">{i.description}</p>
      </div>
    </section>
  );
}
