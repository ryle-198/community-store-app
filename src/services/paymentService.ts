import { supabase } from "@/src/lib/supabase";

export type Payment = {
  payment_id: string;
  order_id: string;
  amount: number;
  status: "pending" | "paid" | "failed" | "refunded";
  provider_reference: string | null;
  paid_at: string | null;
  created_at: string;
};

// NOTE: payment rows are written by service_role only (see RLS policy) --
// there is no real payment provider wired up yet. This service is read-only
// from the client, for displaying whatever status a backend/webhook has set.
export const paymentService = {
  async getByOrderId(orderId: string): Promise<Payment | null> {
    const { data, error } = await supabase
      .from("payment")
      .select("*")
      .eq("order_id", orderId)
      .maybeSingle();

    if (error) throw error;
    return data;
  },
};
