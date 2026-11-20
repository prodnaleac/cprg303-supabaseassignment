//starting screen, sends you to home or sign in depending on the session
import { Redirect } from "expo-router";
import { useAuth } from "../../context/AuthContext";

export default function Index() {
  const { session } = useAuth();

  //logged in goes to home, logged out goes to sign in
  return <Redirect href={session ? "/home" : "/sign-in"} />;
}
