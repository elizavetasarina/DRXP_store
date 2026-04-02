"use client";

import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { PaymentStub } from "@/components/checkout/PaymentStub";

export default function CheckoutPage() {
  return (
    <main className="pt-32 px-6 md:px-10 min-h-screen bg-black text-white">
      <AnimatedSection>
        <h1 className="text-4xl font-bold tracking-tight mb-12">CHECKOUT</h1>
      </AnimatedSection>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1">
          <AnimatedSection>
            <CheckoutForm />
          </AnimatedSection>
          <div className="mt-10">
            <AnimatedSection>
              <PaymentStub />
            </AnimatedSection>
          </div>
        </div>
        <div className="lg:w-[35%]">
          <OrderSummary />
        </div>
      </div>
    </main>
  );
}
