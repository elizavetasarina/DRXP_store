"use client";

import { useTranslations } from "next-intl";

const methodIds = ["card", "yukassa", "tinkoff", "sbp"] as const;

interface PaymentStubProps {
  selected: string;
  onSelect: (id: string) => void;
}

export function PaymentStub({ selected, onSelect }: PaymentStubProps) {
  const t = useTranslations("payment");

  return (
    <div>
      <h2 className="text-sm font-medium tracking-[0.15em] uppercase mb-6">
        {t("title")}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {methodIds.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            className={`border p-4 text-sm text-center transition-colors ${
              selected === id
                ? "border-white/30 bg-white/5"
                : "border-white/10 hover:border-white/20"
            }`}
          >
            <div className="w-8 h-8 mx-auto mb-2 rounded bg-white/10" />
            {t(`methods.${id}`)}
          </button>
        ))}
      </div>

      <p className="text-white/40 text-xs mt-4">
        {t("comingSoon")}
      </p>
    </div>
  );
}
