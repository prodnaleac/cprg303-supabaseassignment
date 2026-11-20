//sign in screen with react hook form and zod validation
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { useAuth } from "../../../context/AuthContext";
import ErrorText from "../../components/ErrorText";
import FormInput from "../../components/FormInput";
import PrimaryButton from "../../components/PrimaryButton";
import { SignInForm, signInSchema } from "../../schemas/auth";
import { authStyles } from "../../styles/authStyles";
import { getAuthErrorMessage } from "../../utils/authErrors";

export default function SignIn() {
  //loading shows the spinner, authError is for errors from supabase
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  //pull signIn out of niko's auth context
  const { signIn } = useAuth();

  //hook up the form to the zod rules
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  //only runs if zod says the form is valid
  const onSubmit = async (data: SignInForm) => {
    setAuthError("");
    setLoading(true);

    try {
      const { error } = await signIn(data.email, data.password);
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
    <View style={authStyles.container}>
      <Text style={authStyles.title}>Welcome back</Text>
      <Text style={authStyles.subtitle}>Sign in to your account</Text>

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
            placeholder="Your password"
            secureTextEntry
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.password?.message}
          />
        )}
      />

      <ErrorText message={authError} />

      <PrimaryButton
        title="Sign In"
        onPress={handleSubmit(onSubmit)}
        loading={loading}
      />

      <View style={authStyles.footer}>
        <Text style={authStyles.footerText}>Don't have an account? </Text>
        <Link href="/sign-up" style={authStyles.link}>
          Sign up
        </Link>
      </View>
    </View>
  );
}
