import { supabase } from "@/src/lib/supabase";

export type ItemCategory =
  | "books"
  | "electronics"
  | "household"
  | "fashion"
  | "leisure";

export type ItemWithRating = {
  item_id: string;
  vendor_id: string;
  item_name: string;
  item_description: string;
  image_url: string | null;
  price: number;
  available: boolean;
  category: ItemCategory | null;
  tag: string | null;
  created_at: string;
  avg_rating: number;
  review_count: number;
};

type GetAllParams = {
  search?: string;
  category?: ItemCategory | null;
};

export const itemService = {
  async getByVendor(vendorId: string): Promise<ItemWithRating[]> {
    const { data, error } = await supabase
      .from("item_with_rating")
      .select("*")
      .eq("vendor_id", vendorId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data ?? []) as ItemWithRating[];
  },

  async getAll({ search, category }: GetAllParams = {}): Promise<
    ItemWithRating[]
  > {
    let query = supabase
      .from("item_with_rating")
      .select("*")
      .eq("available", true)
      .order("created_at", { ascending: false });

    if (search) {
      query = query.ilike("item_name", `%${search}%`);
    }
    if (category) {
      query = query.eq("category", category);
    }

    const { data, error } = await query;
    if (error) throw error;
    return (data ?? []) as ItemWithRating[];
  },

  async create(fields: {
    vendor_id: string;
    item_name: string;
    item_description: string;
    image_url?: string | null;
    price: number;
    category?: ItemCategory | null;
    tag?: string | null;
  }): Promise<string> {
    const { data, error } = await supabase
      .from("item")
      .insert(fields)
      .select("item_id")
      .single();
    if (error) throw error;
    return data.item_id;
  },

  async update(
    itemId: string,
    fields: Partial<{
      item_name: string;
      item_description: string;
      image_url: string | null;
      price: number;
      available: boolean;
      category: ItemCategory | null;
      tag: string | null;
    }>,
  ): Promise<void> {
    const { error } = await supabase
      .from("item")
      .update(fields)
      .eq("item_id", itemId);
    if (error) throw error;
  },

  async remove(itemId: string): Promise<void> {
    const { error } = await supabase
      .from("item")
      .delete()
      .eq("item_id", itemId);
    if (error) throw error;
  },

  async getById(itemId: string): Promise<ItemWithRating | null> {
    const { data, error } = await supabase
      .from("item_with_rating")
      .select("*")
      .eq("item_id", itemId)
      .maybeSingle();

    if (error) throw error;
    return data as ItemWithRating | null;
  },
};
