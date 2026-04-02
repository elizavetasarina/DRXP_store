"use client";

import { useState, FormEvent } from "react";
import { useCartStore } from "@/store/cartStore";

const inputClasses =
  "w-full bg-transparent border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-white/30 transition-colors";

export function CheckoutForm() {
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

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("Order placed!");
    clearCart();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-sm font-medium tracking-[0.15em] uppercase mb-6">
        Shipping Address
      </h2>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First name"
            required
            value={form.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            className={inputClasses}
          />
          <input
            type="text"
            placeholder="Last name"
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
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          className={inputClasses}
        />

        <input
          type="text"
          placeholder="Address line 1"
          required
          value={form.address1}
          onChange={(e) => update("address1", e.target.value)}
          className={inputClasses}
        />

        <input
          type="text"
          placeholder="Address line 2"
          value={form.address2}
          onChange={(e) => update("address2", e.target.value)}
          className={inputClasses}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="City"
            required
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
            className={inputClasses}
          />
          <input
            type="text"
            placeholder="Region"
            value={form.region}
            onChange={(e) => update("region", e.target.value)}
            className={inputClasses}
          />
          <input
            type="text"
            placeholder="Postal code"
            required
            value={form.postalCode}
            onChange={(e) => update("postalCode", e.target.value)}
            className={inputClasses}
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-white text-black py-4 mt-8 text-sm tracking-[0.2em] uppercase hover:bg-white/90 transition-colors"
      >
        Place Order
      </button>
    </form>
  );
}
