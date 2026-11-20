//sign up screen with form validation and public books list
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useAuth } from "../../../context/AuthContext";
import { supabase } from "../../../lib/supabase";
import ErrorText from "../../components/ErrorText";
import FormInput from "../../components/FormInput";
import PrimaryButton from "../../components/PrimaryButton";
import { SignUpForm, signUpSchema } from "../../schemas/auth";
import { authStyles } from "../../styles/authStyles";
import { getAuthErrorMessage } from "../../utils/authErrors";

type Book = {
  id: number;
  title: string;
  author: string;
};

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  //public data from the public_books table
  const [books, setBooks] = useState<Book[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState("");

  //pull signUp out of niko's auth context
  const { signUp } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  //grab the public books once when the screen opens
  useEffect(() => {
    const loadBooks = async () => {
      try {
        const { data, error } = await supabase
          .from("public_books")
          .select("*")
          .order("id");

        if (error) throw error;
        setBooks(data ?? []);
      } catch {
        setListError("Couldn't load books. Check your connection.");
      } finally {
        setListLoading(false);
      }
    };

    loadBooks();
  }, []);

  //only runs if zod says the form is valid
  const onSubmit = async (data: SignUpForm) => {
    setAuthError("");
    setLoading(true);

    try {
      const { error } = await signUp(data.email, data.password);
      //show a readable message if supabase said no
      if (error) setAuthError(getAuthErrorMessage(error));
    } catch (err) {
      //network died or something unexpected, still don't crash
      setAuthError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[authStyles.container, styles.scroll]}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={authStyles.title}>Create account</Text>
      <Text style={authStyles.subtitle}>
        Sign up to see the full collection
      </Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInput
            label="Email"
            placeholder="you@email.com"
            keyboardType="email-address"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInput
            label="Password"
            placeholder="At least 8 characters"
            secureTextEntry
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.password?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInput
            label="Confirm Password"
            placeholder="Type it again"
            secureTextEntry
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.confirmPassword?.message}
          />
        )}
      />

      <ErrorText message={authError} />

      <PrimaryButton
        title="Sign Up"
        onPress={handleSubmit(onSubmit)}
        loading={loading}
      />

      <View style={authStyles.footer}>
        <Text style={authStyles.footerText}>Already have an account? </Text>
        <Link href="/sign-in" style={authStyles.link}>
          Sign in
        </Link>
      </View>

      {/*public data, anyone can see this even logged out*/}
      <Text style={styles.sectionTitle}>Featured Books</Text>

      {listLoading ? (
        <ActivityIndicator style={{ marginTop: 12 }} />
      ) : listError ? (
        <ErrorText message={listError} />
      ) : (
        books.map((book) => (
          <View key={book.id} style={styles.card}>
            <Text style={styles.cardTitle}>{book.title}</Text>
            <Text style={styles.cardText}>{book.author}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    paddingVertical: 48,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 32,
    marginBottom: 12,
    color: "#111",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  cardTitle: {
    fontWeight: "700",
    fontSize: 15,
    marginBottom: 4,
  },
  cardText: {
    color: "#555",
  },
});
