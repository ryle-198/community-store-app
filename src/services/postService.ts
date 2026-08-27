import { supabase } from "@/src/lib/supabase";

export type PostWithAuthor = {
  post_id: string;
  author_id: string;
  title: string;
  body: string;
  created_at: string;
  author_first_name: string;
  author_last_name: string;
};

export const postService = {
  async getRecent(limit = 2): Promise<PostWithAuthor[]> {
    const { data, error } = await supabase
      .from("post_with_author")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;
    return (data ?? []) as PostWithAuthor[];
  },

  async getByAuthor(authorId: string): Promise<PostWithAuthor[]> {
    const { data, error } = await supabase
      .from("post_with_author")
      .select("*")
      .eq("author_id", authorId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data ?? []) as PostWithAuthor[];
  },

  async getAll(): Promise<PostWithAuthor[]> {
    const { data, error } = await supabase
      .from("post_with_author")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data ?? []) as PostWithAuthor[];
  },

  async getById(postId: string): Promise<PostWithAuthor | null> {
    const { data, error } = await supabase
      .from("post_with_author")
      .select("*")
      .eq("post_id", postId)
      .maybeSingle();

    if (error) throw error;
    return data as PostWithAuthor | null;
  },

  async update(
    postId: string,
    fields: { title: string; body: string },
  ): Promise<void> {
    const { error } = await supabase
      .from("post")
      .update(fields)
      .eq("post_id", postId);
    if (error) throw error;
  },

  async create(fields: {
    author_id: string;
    title: string;
    body: string;
  }): Promise<string> {
    const { data, error } = await supabase
      .from("post")
      .insert(fields)
      .select("post_id")
      .single();

    if (error) throw error;
    return data.post_id;
  },

  async remove(postId: string): Promise<void> {
    const { error } = await supabase
      .from("post")
      .delete()
      .eq("post_id", postId);
    if (error) throw error;
  },
};
