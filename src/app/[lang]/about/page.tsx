import { Locale } from "@/i18n.config";
import { getDictionary } from "@/src/lib/dictionary";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "About" },
  alternates: {
    canonical: "/about",
    languages: {
      zh: "http://localhost:3001/zh/about",
      de: "http://localhost:3001/de/about",
      en: "http://localhost:3001/en/about",
    },
  },
};

export default async function About({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { page } = await getDictionary(lang);

  return (
    <section className="py-24">
      <div className="container">
        <h1 className="text-3xl font-bold">{page.about.title}</h1>
        <p className="text-gray-500">{page.about.description}</p>
      </div>
    </section>
  );
}
