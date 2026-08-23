import { Pressable, StyleSheet, Text, View } from "react-native";

const TEAL = "#0A5C74";

type EmptyStateProps = {
  title: string;
  subtitle?: string;
  onRetry?: () => void;
};

export default function EmptyState({
  title,
  subtitle,
  onRetry,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {onRetry && (
        <Pressable style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryText}>TRY AGAIN</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    gap: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#3C4043",
    textAlign: "center",
  },
  subtitle: { fontSize: 13, color: "#9AA0A6", textAlign: "center" },
  retryButton: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: TEAL,
    borderRadius: 6,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  retryText: {
    color: TEAL,
    fontWeight: "700",
    fontSize: 12,
    letterSpacing: 0.5,
  },
});
