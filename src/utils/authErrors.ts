// makes supabase error messages easier to understand
export function getAuthErrorMessage(error: unknown): string {
  // pull the message out no matter what shape the error is
  const message =
    error instanceof Error
      ? error.message.toLowerCase()
      : String(error).toLowerCase();

  //wrong email or password
  if (message.includes("invalid login credentials")) {
    return "Wrong email or password. Please try again.";
  }

  //trying to sign up with an email that's taken
  if (
    message.includes("already registered") ||
    message.includes("already been registered")
  ) {
    return "An account with this email already exists. Try signing in instead.";
  }

  //supabase didn't like the password
  if (
    message.includes("password") &&
    (message.includes("weak") || message.includes("at least"))
  ) {
    return "That password is too weak. Use at least 8 characters with a capital letter and a number.";
  }

  //they haven't clicked the confirmation link
  if (message.includes("email not confirmed")) {
    return "Please confirm your email before signing in.";
  }

  //too many tries
  if (message.includes("rate limit") || message.includes("too many")) {
    return "Too many attempts. Wait a minute and try again.";
  }

  //no internet or supabase is down
  if (message.includes("network") || message.includes("fetch")) {
    return "Can't connect right now. Check your internet and try again.";
  }

  //anything else
  return "Something went wrong. Please try again.";
}
