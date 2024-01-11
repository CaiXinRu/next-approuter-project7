import { Locale } from "@/i18n.config";
import { getDictionary } from "@/src/lib/dictionary";

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const i = await getDictionary(lang, "home");

  return (
    <section className="py-24">
      <div className="container">
        <h1 className="text-3xl font-bold">{i.title}</h1>
        <p className="text-gray-500">{i.description}</p>
      </div>
    </section>
  );
}
