import Link from "next/link";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/src/lib/dictionary";
import LocaleSwitcher from "./locale-switcher";

export default async function Header({ lang }: { lang: Locale }) {
  const i = await getDictionary(lang, "navigation");

  return (
    <header className="py-6">
      <nav className="container flex items-center justify-between">
        <ul className="flex gap-x-8">
          <li>
            <Link href={`/${lang}`}>{i.home}</Link>
          </li>
          <li>
            <Link href={`/${lang}/about`}>{i.about}</Link>
          </li>
          <li>
            <Link href={`/${lang}/press`}>{i.press}</Link>
          </li>
        </ul>
        <LocaleSwitcher />
      </nav>
    </header>
  );
}
