import {
    itemService,
    type ItemCategory,
    type ItemWithRating,
} from "@/src/services/itemService";
import { useCallback, useEffect, useState } from "react";

export function useItems(search: string, category: ItemCategory | null) {
  const [items, setItems] = useState<ItemWithRating[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await itemService.getAll({ search, category });
      setItems(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load items.");
    } finally {
      setLoading(false);
    }
  }, [search, category]);

  useEffect(() => {
    // simple debounce so every keystroke in the search bar doesn't fire a request
    const timeout = setTimeout(load, 300);
    return () => clearTimeout(timeout);
  }, [load]);

  return { items, loading, error, refetch: load };
}
