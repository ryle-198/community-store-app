import { Redirect, Tabs } from "expo-router";
import { useAuthContext } from "../../src/contexts/AuthContext";

export default function StudentLayout() {
  const { session, role, loading } = useAuthContext();

  if (loading) return null;
  if (!session) return <Redirect href="/(auth)/sign-in" />;
  if (role !== "student") return <Redirect href="/" />;

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="marketplace" options={{ title: "Marketplace" }} />
      <Tabs.Screen name="cart" options={{ title: "Cart" }} />
      <Tabs.Screen name="orders" options={{ title: "Orders" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      {/* pushed screens, not tabs — hide from the tab bar */}
      <Tabs.Screen name="item/[id]" options={{ href: null }} />
      <Tabs.Screen name="checkout" options={{ href: null }} />
    </Tabs>
  );
}
