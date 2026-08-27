import { colors } from "@/src/theme/colors";
import { formatRelativeTime } from "@/src/utils/formatRelativeTime";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type PostCardProps = {
  title: string;
  body: string;
  authorFirstName: string;
  authorLastName: string;
  createdAt: string;
  onPress?: () => void;
};

export default function PostCard({
  title,
  body,
  authorFirstName,
  authorLastName,
  createdAt,
  onPress,
}: PostCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.pinBar} />
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.text} numberOfLines={3}>
          {body}
        </Text>
        <View style={styles.metaRow}>
          <Ionicons name="school-outline" size={13} color={colors.muted} />
          <Text style={styles.metaText}>
            {authorFirstName} {authorLastName} · {formatRelativeTime(createdAt)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    overflow: "hidden",
  },
  pinBar: { width: 4, backgroundColor: colors.teal },
  body: { flex: 1, padding: 14, gap: 6 },
  title: { fontSize: 15, fontWeight: "700", color: colors.dark },
  text: { fontSize: 13, color: colors.body, lineHeight: 19 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 2 },
  metaText: { fontSize: 11, color: colors.muted },
});
