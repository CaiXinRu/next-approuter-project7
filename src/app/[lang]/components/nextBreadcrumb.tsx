"use client";

import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/src/lib/dictionary";

type TBreadCrumbProps = {
  separator: ReactNode;
  containerClasses?: string;
  listClasses?: string;
  activeClasses?: string;
  capitalizeLinks?: boolean;
  lang: Locale;
};

export default async function NextBreadcrumb({
  separator,
  containerClasses,
  listClasses,
  activeClasses,
  lang,
}: TBreadCrumbProps) {
  const paths = usePathname();
  const linkPathNames = paths.split("/").filter((path) => path);
  const pathNames = paths.split("/").filter((path) => path);
  pathNames.shift();
  const i = await getDictionary(lang, "navigation");

  return (
    <div>
      <ul className={containerClasses}>
        <li className={listClasses}>
          <Link href={`/${lang}`}>{i.home}</Link>
        </li>
        {pathNames.length > 0 && separator}
        {pathNames.map((link, index) => {
          let href = `/${linkPathNames.slice(0, index + 2).join("/")}`;
          let itemClasses =
            paths === href ? `${listClasses} ${activeClasses}` : listClasses;
          return (
            <React.Fragment key={index}>
              <li className={itemClasses}>
                <Link href={href}>{i[link]}</Link>
              </li>
              {pathNames.length !== index + 1 && separator}
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
}
