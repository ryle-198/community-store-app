import type { CartLine } from "@/src/contexts/CartContext";
import { supabase } from "@/src/lib/supabase";

export type DeliveryDetails = {
  name: string;
  address: string;
  city: string;
  zip: string;
};

export type PaymentMethod = "collection" | "card";

export type OrderWithItems = {
  order_id: string;
  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "ready"
    | "completed"
    | "cancelled";
  total_price: number;
  created_at: string;
  order_item: {
    quantity: number;
    price_at_purchase: number;
    item: {
      item_name: string;
      image_url: string | null;
    } | null;
  }[];
};

export const orderService = {
  async getStudentOrders(studentId: string): Promise<OrderWithItems[]> {
    const { data, error } = await supabase
      .from("orders")
      .select(
        "order_id, status, total_price, created_at, order_item(quantity, price_at_purchase, item(item_name, image_url))",
      )
      .eq("student_id", studentId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data ?? []) as unknown as OrderWithItems[];
  },

  async placeOrder(
    studentId: string,
    lines: CartLine[],
    total: number,
    delivery: DeliveryDetails,
    paymentMethod: PaymentMethod,
  ): Promise<string> {
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        student_id: studentId,
        total_price: total,
        delivery_name: delivery.name,
        delivery_address: delivery.address,
        delivery_city: delivery.city,
        delivery_zip: delivery.zip,
        payment_method: paymentMethod,
      })
      .select("order_id")
      .single();

    if (orderError) throw orderError;

    const orderItems = lines.map((l) => ({
      order_id: order.order_id,
      item_id: l.item_id,
      quantity: l.quantity,
      price_at_purchase: l.price,
    }));

    const { error: itemsError } = await supabase
      .from("order_item")
      .insert(orderItems);
    if (itemsError) throw itemsError;

    return order.order_id;
  },
};
