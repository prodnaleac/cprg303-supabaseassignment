//labeled text input with an error message underneath
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
} from "react-native";
import ErrorText from "./ErrorText";

type Props = TextInputProps & {
  label: string;
  error?: string;
};

export default function FormInput({ label, error, ...inputProps }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        // border turns red if this field has an error
        style={[styles.input, error && styles.inputError]}
        placeholderTextColor="#999"
        autoCapitalize="none"
        {...inputProps}
      />
      <ErrorText message={error} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#222",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "#d93025",
  },
});
