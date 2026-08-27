import { colors } from "@/src/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

type RatingStarsProps = {
  rating: number;
  size?: number;
  onRate?: (rating: number) => void;
};

export default function RatingStars({
  rating,
  size = 16,
  onRate,
}: RatingStarsProps) {
  const interactive = Boolean(onRate);
  const stars = [1, 2, 3, 4, 5];

  return (
    <View style={styles.row}>
      {stars.map((star) => {
        const filled = star <= Math.round(rating);
        const StarComponent = interactive ? Pressable : View;
        return (
          <StarComponent
            key={star}
            onPress={interactive ? () => onRate?.(star) : undefined}
            hitSlop={4}
          >
            <Ionicons
              name={filled ? "star" : "star-outline"}
              size={size}
              color={filled ? colors.star : colors.muted}
            />
          </StarComponent>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 2 },
});
