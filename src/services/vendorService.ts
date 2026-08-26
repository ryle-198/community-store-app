import { supabase } from "@/src/lib/supabase";

export type VendorWithRating = {
  vendor_id: string;
  first_name: string;
  last_name: string;
  email: string;
  address: string | null;
  phone_number: string | null;
  avg_rating: number;
  review_count: number;
};

export const vendorService = {
  async getById(vendorId: string): Promise<VendorWithRating | null> {
    const { data, error } = await supabase
      .from("vendor_with_rating")
      .select("*")
      .eq("vendor_id", vendorId)
      .maybeSingle();

    if (error) throw error;

    return data as VendorWithRating | null;
  },

  async update(
    vendorId: string,
    fields: {
      first_name?: string;
      last_name?: string;
      address?: string | null;
      phone_number?: string | null;
    },
  ): Promise<void> {
    const { error } = await supabase
      .from("vendor")
      .update(fields)
      .eq("vendor_id", vendorId);

    if (error) throw error;
  },
};
