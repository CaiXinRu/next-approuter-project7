"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LocaleSwitcher() {
  const pathName = usePathname();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const languages = [
    { key: "en", label: "English" },
    { key: "de", label: "Deutsch" },
    { key: "zh", label: "繁體中文" },
  ];

  return (
    <ul className="flex gap-x-3">
      {languages.map(({ key, label }) => (
        <li key={key}>
          <Link
            href={redirectedPathName(key)}
            className="rounded-md border bg-black px-3 py-2 text-white"
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
