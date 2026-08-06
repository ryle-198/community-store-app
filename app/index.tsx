import SignInScreen from "@/src/screens/auth/SignInScreen";
import { View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Text>Edit app/index.tsx to edit this screen.</Text> */}
      <SignInScreen />
    </View>
  );
}
