import { Redirect, Stack } from "expo-router";
import { useAuthContext } from "../../src/contexts/AuthContext";

export default function AuthLayout() {
  const { session, loading } = useAuthContext();

  if (loading) return null;
  // already signed in — let app/index.tsx redirect to the right role home
  if (session) return <Redirect href="/" />;

  return <Stack screenOptions={{ headerShown: false }} />;
}
