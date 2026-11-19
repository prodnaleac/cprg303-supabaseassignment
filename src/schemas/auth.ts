// zod schemas for sign in and sign up forms
import { z } from "zod";

// sign in need email and password
export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "email is required")
    .email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

//sign in is stricter, password needs to be decent and both have to match
export const signUpSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password needs at least one uppercase letter")
      .regex(/[0-9]/, "Password needs at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], //shows error under confirm field
  });

//types pulled from schemas so the forms know what the field means
export type SignInForm = z.infer<typeof signInSchema>;
export type SignUpForm = z.infer<typeof signUpSchema>;
