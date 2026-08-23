import type { ItemWithRating } from "@/src/services/itemService";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const TEAL = "#0A5C74";

export default function ItemCard({ item }: { item: ItemWithRating }) {
  return (
    <Pressable
      style={styles.card}
      onPress={() => router.push(`/(student)/item/${item.item_id}`)}
    >
      <View style={styles.imageWrapper}>
        {item.image_url ? (
          <Image
            source={{ uri: item.image_url }}
            style={styles.image}
            contentFit="cover"
          />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}
      </View>

      <View style={styles.info}>
        <View style={styles.priceRow}>
          <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
          {item.review_count > 0 && (
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={12} color="#F5A623" />
              <Text style={styles.ratingText}>
                {item.avg_rating.toFixed(1)}
              </Text>
            </View>
          )}
        </View>

        <Text style={styles.name} numberOfLines={1}>
          {item.item_name}
        </Text>

        {item.tag && (
          <View style={styles.tagPill}>
            <Text style={styles.tagText}>{item.tag}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E1E4E6",
    overflow: "hidden",
  },
  imageWrapper: { aspectRatio: 1.3, backgroundColor: "#E1E4E6" },
  image: { width: "100%", height: "100%" },
  imagePlaceholder: { flex: 1, backgroundColor: "#E1E4E6" },
  info: { padding: 12, gap: 4 },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: { fontSize: 15, fontWeight: "700", color: TEAL },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 3 },
  ratingText: { fontSize: 12, fontWeight: "600", color: "#3C4043" },
  name: { fontSize: 13, color: "#3C4043" },
  tagPill: {
    alignSelf: "flex-start",
    backgroundColor: "#EAF3F5",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 2,
  },
  tagText: { fontSize: 10, fontWeight: "600", color: TEAL },
});
