import { Redirect, Tabs } from "expo-router";
import { useAuthContext } from "../../src/contexts/AuthContext";

export default function VendorLayout() {
  const { session, role, loading } = useAuthContext();

  if (loading) return null;
  if (!session) return <Redirect href="/(auth)/sign-in" />;
  if (role !== "vendor") return <Redirect href="/" />;

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="dashboard" options={{ title: "Dashboard" }} />
      {/* NOTE: this matches your current tree (orders.tsx/profile.tsx nested
          under items/). If that nesting was accidental, move them up to sit
          directly under (vendor)/ — see the note below. */}
      <Tabs.Screen name="items/index" options={{ title: "Items" }} />
      <Tabs.Screen name="items/orders" options={{ title: "Orders" }} />
      <Tabs.Screen name="items/profile" options={{ title: "Profile" }} />
      <Tabs.Screen name="items/[id]" options={{ href: null }} />
    </Tabs>
  );
}
