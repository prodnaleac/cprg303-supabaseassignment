// red error messages used under inputs and for authentication errors
import { StyleSheet, Text } from "react-native";

type Props = {
  message?: string;
};

export default function ErrorText({ message }: Props) {
  //nothing to show, so render nothing
  if (!message) return null;

  return <Text style={styles.error}>{message}</Text>;
}

const styles = StyleSheet.create({
  error: {
    color: "#d93025",
    fontSize: 13,
    marginTop: 4,
  },
});
