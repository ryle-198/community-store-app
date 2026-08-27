import { orderService, type OrderWithItems } from "@/src/services/orderService";
import { useCallback, useEffect, useState } from "react";

// NOTE: OrderHistoryScreen currently has its own inline fetch logic rather
// than using this hook -- built at different times. Functionally equivalent;
// swapping OrderHistoryScreen to use this hook instead is a safe cleanup,
// not required for anything to work.
export function useOrders(studentId: string | undefined) {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!studentId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      setOrders(await orderService.getStudentOrders(studentId));
    } catch (e: any) {
      setError(e?.message ?? "Failed to load orders.");
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    load();
  }, [load]);

  return { orders, loading, error, refetch: load };
}
