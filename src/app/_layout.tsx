import { Stack } from "expo-router";
import SplashScreen from "../../components/SplashScreen";
import { AuthProvider, useAuth } from "../../context/AuthContext";

function RootNavigator() {
  const { session, loading } = useAuth();

  if (loading) {
    return <SplashScreen />;
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>
      <Stack.Protected guard={!session}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
