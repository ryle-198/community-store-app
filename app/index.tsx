import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useAuthContext } from "../src/contexts/AuthContext";

export default function Index() {
  const { session, role, loading } = useAuthContext();

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!session) return <Redirect href="/(auth)/sign-in" />;

  switch (role) {
    case "student":
      return <Redirect href="/(student)/marketplace" />;
    case "vendor":
      return <Redirect href="/(vendor)/dashboard" />;
    case "faculty":
      return <Redirect href="/(faculty)/home" />;
    default:
      // signed in but no role metadata. Shouldn't happen if signUp() always
      // sends role, but bail to sign-in rather than crash
      return <Redirect href="/(auth)/sign-in" />;
  }
}
