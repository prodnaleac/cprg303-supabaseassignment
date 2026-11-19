//stack layout for the sign in and sign up screens
import { Stack } from "expo-router";

export default function AuthLayout() {
  //hiding the header since each screen has its own title
  return <Stack screenOptions={{ headerShown: false }} />;
}
