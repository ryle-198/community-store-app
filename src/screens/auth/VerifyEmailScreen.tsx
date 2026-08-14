import { supabase } from "@/src/lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TEAL = "#0A5C74";

export default function VerifyEmailScreen() {
  const { email } = useLocalSearchParams<{ email?: string }>();
  const [resending, setResending] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleResend = async () => {
    if (!email) return;
    setResending(true);
    setStatus(null);
    const { error } = await supabase.auth.resend({ type: "signup", email });
    setResending(false);
    setStatus(error ? error.message : "Confirmation email sent.");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.iconCircle}>
          <Ionicons name="mail-outline" size={32} color={TEAL} />
        </View>

        <Text style={styles.title}>Check your inbox</Text>
        <Text style={styles.subtitle}>
          We sent a confirmation link to{" "}
          <Text style={styles.emailText}>
            {email ?? "your university email"}
          </Text>
          . Open it to activate your account, then come back and log in.
        </Text>

        {status && <Text style={styles.statusText}>{status}</Text>}

        <Pressable
          style={styles.resendButton}
          onPress={handleResend}
          disabled={resending || !email}
        >
          {resending ? (
            <ActivityIndicator color={TEAL} />
          ) : (
            <Text style={styles.resendButtonText}>RESEND EMAIL</Text>
          )}
        </Pressable>

        <Pressable
          style={styles.loginButton}
          onPress={() => router.replace("/(auth)/sign-in")}
        >
          <Text style={styles.loginButtonText}>BACK TO LOGIN</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#EAF3F5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: TEAL,
    textAlign: "center",
    marginBottom: 12,
    fontFamily: Platform.select({
      ios: "Georgia",
      android: "serif",
      default: "serif",
    }),
  },
  subtitle: {
    fontSize: 14,
    color: "#5F6368",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  emailText: { fontWeight: "700", color: "#1A1A1A" },
  statusText: {
    fontSize: 13,
    color: TEAL,
    textAlign: "center",
    marginBottom: 16,
  },
  resendButton: {
    borderWidth: 1,
    borderColor: TEAL,
    borderRadius: 6,
    paddingVertical: 14,
    paddingHorizontal: 28,
    alignItems: "center",
    marginBottom: 16,
    minWidth: 220,
  },
  resendButtonText: {
    color: TEAL,
    fontWeight: "700",
    fontSize: 13,
    letterSpacing: 0.5,
  },
  loginButton: { paddingVertical: 10 },
  loginButtonText: {
    color: "#9AA0A6",
    fontWeight: "600",
    fontSize: 13,
    letterSpacing: 0.5,
  },
});
