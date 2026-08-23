import { colors } from "@/src/theme/colors";
import { StyleSheet, Text, View } from "react-native";

type Status =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "completed"
  | "cancelled";

const STATUS_CONFIG: Record<Status, { label: string; bg: string; fg: string }> =
  {
    pending: { label: "Pending", bg: "#FDF3E0", fg: "#B98900" },
    confirmed: { label: "Confirmed", bg: colors.tealLight, fg: colors.teal },
    preparing: { label: "Preparing", bg: colors.tealLight, fg: colors.teal },
    ready: { label: "Ready", bg: "#E6F4EA", fg: "#2E7D32" },
    completed: { label: "Completed", bg: "#E6F4EA", fg: "#2E7D32" },
    cancelled: { label: "Cancelled", bg: "#FBE9E7", fg: colors.danger },
  };

export default function OrderStatusBadge({ status }: { status: Status }) {
  const config = STATUS_CONFIG[status];
  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <Text style={[styles.text, { color: config.fg }]}>{config.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { borderRadius: 4, paddingHorizontal: 8, paddingVertical: 3 },
  text: { fontSize: 10, fontWeight: "700", letterSpacing: 0.3 },
});
