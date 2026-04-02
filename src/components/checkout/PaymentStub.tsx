"use client";

import { useState } from "react";

const methods = [
  { id: "card", name: "Bank Card" },
  { id: "yukassa", name: "YuKassa" },
  { id: "tinkoff", name: "Tinkoff Pay" },
  { id: "sbp", name: "SBP" },
];

export function PaymentStub() {
  const [selected, setSelected] = useState("card");

  return (
    <div>
      <h2 className="text-sm font-medium tracking-[0.15em] uppercase mb-6">
        Payment Method
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {methods.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setSelected(m.id)}
            className={`border p-4 text-sm text-center transition-colors ${
              selected === m.id
                ? "border-white/30 bg-white/5"
                : "border-white/10 hover:border-white/20"
            }`}
          >
            <div className="w-8 h-8 mx-auto mb-2 rounded bg-white/10" />
            {m.name}
          </button>
        ))}
      </div>

      <p className="text-white/40 text-xs mt-4">
        Payment integration coming soon
      </p>
    </div>
  );
}
