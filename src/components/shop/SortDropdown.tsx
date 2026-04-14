"use client";

import { useTranslations } from "next-intl";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function SortDropdown({ value, onChange }: Props) {
  const t = useTranslations("sort");

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-transparent border border-white/10 text-xs tracking-[0.15em] uppercase text-white/70 px-3 py-2 outline-none cursor-pointer hover:border-white/30 transition-colors"
    >
      <option value="newest" className="bg-black">{t("newest")}</option>
      <option value="price-asc" className="bg-black">{t("priceLowHigh")}</option>
      <option value="price-desc" className="bg-black">{t("priceHighLow")}</option>
      <option value="name-az" className="bg-black">{t("nameAZ")}</option>
    </select>
  );
}
