import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { orderRepository } from "@/server/repositories/order.repository";
import { OrderList } from "./OrderList";

export default async function OrdersPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const { orders } = await orderRepository.findByUserId(session.user.id);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 md:px-10">
      <h1 className="text-3xl tracking-[0.2em] font-light mb-12">
        ORDER HISTORY
      </h1>
      <OrderList orders={orders} />
    </div>
  );
}
