import EmptyState from "@/src/components/EmptyState";
import { useCart } from "@/src/hooks/useCart";
import { itemService, type ItemWithRating } from "@/src/services/itemService";
import {
  vendorService,
  type VendorWithRating,
} from "@/src/services/vendorService";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TEAL = "#0A5C74";

export default function ItemDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addItem } = useCart();

  const [item, setItem] = useState<ItemWithRating | null>(null);
  const [vendor, setVendor] = useState<VendorWithRating | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const foundItem = await itemService.getById(id);
        if (cancelled) return;
        setItem(foundItem);
        if (foundItem) {
          const foundVendor = await vendorService.getById(foundItem.vendor_id);
          if (!cancelled) setVendor(foundVendor);
        }
      } catch (e) {
        if (!cancelled)
          setError(e instanceof Error ? e.message : "Failed to load item.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleAddToCart = () => {
    if (!item) return;
    addItem({
      item_id: item.item_id,
      item_name: item.item_name,
      price: item.price,
      image_url: item.image_url,
      vendor_id: item.vendor_id,
      vendor_name: vendor
        ? `${vendor.first_name} ${vendor.last_name}`
        : "Unknown Seller",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleContact = () => {
    if (!vendor?.phone_number) return;
    Linking.openURL(`tel:${vendor.phone_number}`);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator style={{ marginTop: 40 }} color={TEAL} />
      </SafeAreaView>
    );
  }

  if (error || !item) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <EmptyState title="Item not found" subtitle={error ?? undefined} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>Item Details</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
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

        <View style={styles.titleRow}>
          <Text style={styles.itemName}>{item.item_name}</Text>
          <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
        </View>

        {item.tag && (
          <View style={styles.tagPill}>
            <Ionicons name="checkmark-circle" size={13} color={TEAL} />
            <Text style={styles.tagText}>{item.tag}</Text>
          </View>
        )}

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{item.item_description}</Text>

        {vendor && (
          <View style={styles.vendorCard}>
            <View style={styles.vendorAvatar}>
              <Ionicons name="person-outline" size={22} color="#9AA0A6" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.vendorName}>
                {vendor.first_name} {vendor.last_name}
              </Text>
              {vendor.review_count > 0 && (
                <View style={styles.vendorRatingRow}>
                  <Ionicons name="star" size={12} color="#F5A623" />
                  <Text style={styles.vendorRatingText}>
                    {vendor.avg_rating.toFixed(1)} ({vendor.review_count}{" "}
                    reviews)
                  </Text>
                </View>
              )}
            </View>
            <Pressable
              style={styles.contactButton}
              onPress={handleContact}
              disabled={!vendor.phone_number}
            >
              <Text style={styles.contactButtonText}>CONTACT</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>

      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.totalLabel}>TOTAL</Text>
          <Text style={styles.totalPrice}>R{item.price.toFixed(2)}</Text>
        </View>
        <Pressable style={styles.addButton} onPress={handleAddToCart}>
          <Ionicons name="cart-outline" size={18} color="#fff" />
          <Text style={styles.addButtonText}>
            {added ? "ADDED" : "ADD TO CART"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  header: {
    backgroundColor: TEAL,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  headerTitle: { color: "#fff", fontSize: 16, fontWeight: "700" },
  scrollContent: { paddingBottom: 24 },
  imageWrapper: { width: "100%", aspectRatio: 1.4, backgroundColor: "#E1E4E6" },
  image: { width: "100%", height: "100%" },
  imagePlaceholder: { flex: 1, backgroundColor: "#E1E4E6" },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  itemName: {
    flex: 1,
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
    marginRight: 12,
  },
  price: { fontSize: 18, fontWeight: "700", color: TEAL },
  tagPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    alignSelf: "flex-start",
    backgroundColor: "#EAF3F5",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginHorizontal: 20,
    marginTop: 10,
  },
  tagText: { fontSize: 11, fontWeight: "700", color: TEAL },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1A1A1A",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    color: "#5F6368",
    lineHeight: 20,
    marginHorizontal: 20,
  },
  vendorCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E1E4E6",
    borderRadius: 8,
  },
  vendorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F7F8",
    alignItems: "center",
    justifyContent: "center",
  },
  vendorName: { fontSize: 14, fontWeight: "700", color: "#1A1A1A" },
  vendorRatingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginTop: 2,
  },
  vendorRatingText: { fontSize: 12, color: "#5F6368" },
  contactButton: {
    borderWidth: 1,
    borderColor: TEAL,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  contactButtonText: {
    color: TEAL,
    fontWeight: "700",
    fontSize: 11,
    letterSpacing: 0.5,
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#E1E4E6",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  totalLabel: {
    fontSize: 10,
    color: "#9AA0A6",
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  totalPrice: { fontSize: 18, fontWeight: "700", color: TEAL },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: TEAL,
    borderRadius: 6,
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
    letterSpacing: 0.5,
  },
});
