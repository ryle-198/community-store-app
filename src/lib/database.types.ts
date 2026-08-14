// TEMPORARY — hand-written to match supabase/migrations/0001_init.sql.
// Replace with the CLI/dashboard-generated version as soon as possible so
// this stays in sync automatically with future schema changes.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      student: {
        Row: {
          student_id: string;
          first_name: string;
          last_name: string;
          stud_email: string;
          address: string | null;
          phone_number: string | null;
          created_at: string;
        };
        Insert: {
          student_id: string;
          first_name: string;
          last_name: string;
          stud_email: string;
          address?: string | null;
          phone_number?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["student"]["Insert"]>;
      };
      faculty_member: {
        Row: {
          fmember_id: string;
          first_name: string;
          last_name: string;
          fmember_email: string;
          address: string | null;
          phone_number: string | null;
          created_at: string;
        };
        Insert: {
          fmember_id: string;
          first_name: string;
          last_name: string;
          fmember_email: string;
          address?: string | null;
          phone_number?: string | null;
          created_at?: string;
        };
        Update: Partial<
          Database["public"]["Tables"]["faculty_member"]["Insert"]
        >;
      };
      vendor: {
        Row: {
          vendor_id: string;
          first_name: string;
          last_name: string;
          email: string;
          address: string | null;
          phone_number: string | null;
          created_at: string;
        };
        Insert: {
          vendor_id: string;
          first_name: string;
          last_name: string;
          email: string;
          address?: string | null;
          phone_number?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["vendor"]["Insert"]>;
      };
      item: {
        Row: {
          item_id: string;
          vendor_id: string;
          item_name: string;
          item_description: string;
          image_url: string | null;
          price: number;
          available: boolean;
          created_at: string;
        };
        Insert: {
          item_id?: string;
          vendor_id: string;
          item_name: string;
          item_description: string;
          image_url?: string | null;
          price: number;
          available?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["item"]["Insert"]>;
      };
      orders: {
        Row: {
          order_id: string;
          student_id: string;
          status:
            | "pending"
            | "confirmed"
            | "preparing"
            | "ready"
            | "completed"
            | "cancelled";
          total_price: number;
          created_at: string;
        };
        Insert: {
          order_id?: string;
          student_id: string;
          status?:
            | "pending"
            | "confirmed"
            | "preparing"
            | "ready"
            | "completed"
            | "cancelled";
          total_price?: number;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["orders"]["Insert"]>;
      };
      order_item: {
        Row: {
          order_id: string;
          item_id: string;
          quantity: number;
          price_at_purchase: number;
        };
        Insert: {
          order_id: string;
          item_id: string;
          quantity: number;
          price_at_purchase: number;
        };
        Update: Partial<Database["public"]["Tables"]["order_item"]["Insert"]>;
      };
      payment: {
        Row: {
          payment_id: string;
          order_id: string;
          amount: number;
          status: "pending" | "paid" | "failed" | "refunded";
          provider_reference: string | null;
          paid_at: string | null;
          created_at: string;
        };
        Insert: {
          payment_id?: string;
          order_id: string;
          amount: number;
          status?: "pending" | "paid" | "failed" | "refunded";
          provider_reference?: string | null;
          paid_at?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["payment"]["Insert"]>;
      };
      review: {
        Row: {
          review_id: string;
          student_id: string;
          item_id: string;
          rating: number;
          comment: string | null;
          created_at: string;
        };
        Insert: {
          review_id?: string;
          student_id: string;
          item_id: string;
          rating: number;
          comment?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["review"]["Insert"]>;
      };
      post: {
        Row: {
          post_id: string;
          author_id: string;
          title: string;
          body: string;
          created_at: string;
        };
        Insert: {
          post_id?: string;
          author_id: string;
          title: string;
          body: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["post"]["Insert"]>;
      };
      notification: {
        Row: {
          notification_id: string;
          recipient_id: string;
          type: string;
          message: string;
          read: boolean;
          created_at: string;
        };
        Insert: {
          notification_id?: string;
          recipient_id: string;
          type: string;
          message: string;
          read?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["notification"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
