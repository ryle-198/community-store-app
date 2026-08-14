import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View, type TextInputProps } from "react-native";

type ThemedTextInputProps = TextInputProps & {
  icon?: keyof typeof Ionicons.glyphMap;
};

const ThemedTextInput = ({ style, icon, ...props }: ThemedTextInputProps) => {
  return (
    <View style={styles.wrapper}>
      {icon && (
        <Ionicons name={icon} size={18} color="#8A8A8A" style={styles.icon} />
      )}
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor="#9AA0A6"
        autoCapitalize="none"
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F7F8",
    borderWidth: 1,
    borderColor: "#E1E4E6",
    borderRadius: 6,
    paddingHorizontal: 14,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: "#1A1A1A",
  },
});

export default ThemedTextInput;
