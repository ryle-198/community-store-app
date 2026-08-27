import {
    notificationService,
    type Notification,
} from "@/src/services/notificationService";
import { useCallback, useEffect, useMemo, useState } from "react";

export function useNotifications(userId: string | undefined) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      setNotifications(await notificationService.getForUser(userId));
    } catch (e: any) {
      setError(e?.message ?? "Failed to load notifications.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    load();
  }, [load]);

  const markRead = async (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.notification_id === notificationId ? { ...n, read: true } : n,
      ),
    );
    try {
      await notificationService.markRead(notificationId);
    } catch {
      load(); // revert on failure
    }
  };

  const markAllRead = async () => {
    if (!userId) return;
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    try {
      await notificationService.markAllRead(userId);
    } catch {
      load();
    }
  };

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications],
  );

  return {
    notifications,
    loading,
    error,
    unreadCount,
    refetch: load,
    markRead,
    markAllRead,
  };
}
