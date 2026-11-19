import { Stack } from "expo-router";
import { Alert, Pressable, Text } from "react-native";
import { useAuth } from "../../../context/AuthContext";

export default function AppLayout() {
  const { user, signOut } = useAuth();

  const displayName =
    user?.user_metadata?.display_name ?? user?.email ?? "Account";

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      Alert.alert("Sign out failed", error.message);
    }
  };

  return (
    <Stack
      screenOptions={{
        headerTitle: displayName,
        headerRight: () => (
          <Pressable onPress={handleSignOut} hitSlop={8}>
            <Text style={{ color: "#d00", fontWeight: "600" }}>Sign out</Text>
          </Pressable>
        ),
      }}
    />
  );
}
