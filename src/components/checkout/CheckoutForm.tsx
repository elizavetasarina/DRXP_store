"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useCartStore } from "@/store/cartStore";

const inputClasses =
  "w-full bg-transparent border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-white/30 transition-colors";

interface CheckoutFormProps {
  paymentMethod: string;
}

export function CheckoutForm({ paymentMethod }: CheckoutFormProps) {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const promoCode = useCartStore((s) => s.promoCode);
  const clearCart = useCartStore((s) => s.clearCart);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    region: "",
    postalCode: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const t = useTranslations("checkoutForm");

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: items.map((i) => ({
          productId: i.productId,
          variantId: i.variantId,
          quantity: i.quantity,
          price: i.price,
        })),
        shippingAddress: { ...form },
        promoCode: promoCode?.code,
        paymentMethod,
      }),
    });

    if (!res.ok) {
      setError(t("orderError"));
      setLoading(false);
      return;
    }

    const { orderId } = await res.json();
    clearCart();
    router.push(`/order-confirmation?orderId=${orderId}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-sm font-medium tracking-[0.15em] uppercase mb-6">
        {t("shippingAddress")}
      </h2>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder={t("firstName")}
            required
            value={form.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            className={inputClasses}
          />
          <input
            type="text"
            placeholder={t("lastName")}
            required
            value={form.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            className={inputClasses}
          />
        </div>

        <input
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          className={inputClasses}
        />

        <input
          type="tel"
          placeholder={t("phone")}
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          className={inputClasses}
        />

        <input
          type="text"
          placeholder={t("address1")}
          required
          value={form.address1}
          onChange={(e) => update("address1", e.target.value)}
          className={inputClasses}
        />

        <input
          type="text"
          placeholder={t("address2")}
          value={form.address2}
          onChange={(e) => update("address2", e.target.value)}
          className={inputClasses}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder={t("city")}
            required
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
            className={inputClasses}
          />
          <input
            type="text"
            placeholder={t("region")}
            value={form.region}
            onChange={(e) => update("region", e.target.value)}
            className={inputClasses}
          />
          <input
            type="text"
            placeholder={t("postalCode")}
            required
            value={form.postalCode}
            onChange={(e) => update("postalCode", e.target.value)}
            className={inputClasses}
          />
        </div>
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-400">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading || items.length === 0}
        className="w-full bg-white text-black py-4 mt-8 text-sm tracking-[0.2em] uppercase hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "..." : t("placeOrder")}
      </button>
    </form>
  );
}
