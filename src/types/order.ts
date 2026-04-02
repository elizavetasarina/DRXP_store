export type OrderStatus =
  | "PENDING"
  | "PAID"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId: string;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  promoCodeId?: string | null;
  shippingAddress: ShippingAddress;
  paymentMethod?: string | null;
  paymentId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
