import { Locale } from "@/i18n.config";
import Link from "next/link";
import { getDictionary } from "@/src/lib/dictionary";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Press",
  alternates: {
    canonical: "/press",
    languages: {
      zh: "http://localhost:3001/zh/press",
      de: "http://localhost:3001/de/press",
      en: "http://localhost:3001/en/press",
    },
  },
};

export default async function Press({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const i = await getDictionary(lang, "press");

  return (
    <section className="py-24">
      <div className="container">
        <h1 className="text-3xl font-bold">{i.title}</h1>
        <p className="text-gray-500">{i.description}</p>
        <Link
          className="text-orange-500 hover:underline"
          href={`/${lang}/press/news`}
        >
          {i.click}
        </Link>
      </div>
    </section>
  );
}
