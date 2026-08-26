import { supabase } from "@/src/lib/supabase";

export type ReviewWithStudent = {
  review_id: string;
  student_id: string;
  item_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  student: {
    first_name: string;
    last_name: string;
  } | null;
};

export const reviewService = {
  async getForItem(itemId: string): Promise<ReviewWithStudent[]> {
    const { data, error } = await supabase
      .from("review")
      .select("*, student(first_name, last_name)")
      .eq("item_id", itemId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data ?? []) as unknown as ReviewWithStudent[];
  },

  async hasReviewed(studentId: string, itemId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from("review")
      .select("review_id")
      .eq("student_id", studentId)
      .eq("item_id", itemId)
      .maybeSingle();

    if (error) throw error;
    return data !== null;
  },

  async create(fields: {
    student_id: string;
    item_id: string;
    rating: number;
    comment?: string | null;
  }): Promise<void> {
    const { error } = await supabase.from("review").insert(fields);
    if (error) throw error;
  },
};
