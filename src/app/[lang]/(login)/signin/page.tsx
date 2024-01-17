import { Locale } from "@/i18n.config";
import { getDictionary } from "@/src/lib/dictionary";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "signIn",
  alternates: {
    canonical: "/signin",
    languages: {
      zh: "http://localhost:3001/zh/signin",
      de: "http://localhost:3001/de/signin",
      en: "http://localhost:3001/en/signin",
    },
  },
};

export default async function SignIn({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  //   const i = await getDictionary(lang, "press_news");

  return (
    <section className="py-24">
      <div className="container">
        <h1 className="text-3xl font-bold">登入</h1>
        <p className="text-gray-500">點我註冊</p>
      </div>
    </section>
  );
}
