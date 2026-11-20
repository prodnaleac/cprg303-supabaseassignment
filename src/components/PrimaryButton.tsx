//main button that shows a spinner while loading
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
};

export default function PrimaryButton({
  title,
  onPress,
  loading = false,
}: Props) {
  return (
    <Pressable
      //can't spam the button while a request is going
      disabled={loading}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        (pressed || loading) && styles.buttonDim,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#3ecf8e",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  buttonDim: {
    opacity: 0.7,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
