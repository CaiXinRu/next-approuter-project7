import { Locale } from "@/i18n.config";
import { getDictionary } from "@/src/lib/dictionary";

export default async function Home({
  params: { lang, money: initialMoney },
}: {
  params: { lang: Locale; money: number };
}) {
  const i = await getDictionary(lang, "home");
  let money = 10000000000000000;

  // Replace the {{money}} placeholder with the actual money value
  const moneyText = i.money.replace("{{money}}", money.toString());

  return (
    <section className="py-24">
      <div className="container">
        <h1 className="text-3xl font-bold">{i.title}</h1>
        <p className="text-gray-500">{i.description}</p>
        <p>{moneyText}</p>
      </div>
    </section>
  );
}
