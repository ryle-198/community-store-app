import { Redirect, Tabs } from "expo-router";
import { useAuthContext } from "../../src/contexts/AuthContext";

export default function FacultyLayout() {
  const { session, role, loading } = useAuthContext();

  if (loading) return null;
  if (!session) return <Redirect href="/(auth)/sign-in" />;
  if (role !== "faculty") return <Redirect href="/" />;

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      {/* pushed screens, not tabs — hide from the tab bar */}
      <Tabs.Screen name="post/new" options={{ href: null }} />
      <Tabs.Screen name="post/[id]/edit" options={{ href: null }} />
    </Tabs>
  );
}
