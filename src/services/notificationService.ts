import { supabase } from "@/src/lib/supabase";

export type Notification = {
  notification_id: string;
  recipient_id: string;
  type: string;
  message: string;
  read: boolean;
  created_at: string;
};

export const notificationService = {
  async getForUser(userId: string): Promise<Notification[]> {
    const { data, error } = await supabase
      .from("notification")
      .select("*")
      .eq("recipient_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data ?? [];
  },

  async markRead(notificationId: string): Promise<void> {
    const { error } = await supabase
      .from("notification")
      .update({ read: true })
      .eq("notification_id", notificationId);
    if (error) throw error;
  },

  async markAllRead(userId: string): Promise<void> {
    const { error } = await supabase
      .from("notification")
      .update({ read: true })
      .eq("recipient_id", userId)
      .eq("read", false);
    if (error) throw error;
  },
};
