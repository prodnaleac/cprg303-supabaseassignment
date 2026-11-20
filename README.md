# Supabase Auth App

Expo app with Supabase Auth. Sign up, sign in, sign out, protected screens and form validation with React Hook Form and Zod.

## Team

| Name          | Role                                                                                                                |
| ------------- | ------------------------------------------------------------------------------------------------------------------- |
| Caelan Abugan | Auth screens, forms, validation, error handling, UI components, Supabase README notes                               |
| Niko Dewit    | Supabase client, AuthContext, session handling, protected routing, splash and home screens, Supabase tables and RLS |

## Running the App

1. Clone the repo
   ```bash
   git clone https://github.com/prodnaleac/cprg303-supabaseassignment.git
   cd cprg303-supabaseassignment
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Set up your `.env` file (see **Supabase Setup** below)
4. Start the app
   ```bash
   npx expo start
   ```
5. Scan the QR code with **Expo Go** on your phone, or press **i** for the iOS simulator or **a** for the Android emulator

If the app says Supabase env vars are missing, stop the server and run `npx expo start -c` to clear the cache.

## Supabase Setup

### 1. Create the project

1. Make a new project on [supabase.com](https://supabase.com)
2. Go to **Project Settings → API Keys** and copy the **Project URL** and the **publishable (anon) key**
3. Copy `.env.example` to a new file called `.env` in the root of the project and fill it in:
   ```
   EXPO_PUBLIC_SUPABASE_URL=your-project-url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
   `.env` is in `.gitignore`, so your keys never get committed.

### 2. Turn off email confirmation

Go to **Authentication → Sign In / Providers → User Signups** and turn off **Confirm email**. That way new users get logged in right after signing up instead of needing to click an email link.

### 3. Create the tables

Open the **SQL Editor** and run:

```sql
-- public table: anyone can read, shown on the sign up screen
create table public_books (
  id bigint generated always as identity primary key,
  title text not null,
  author text not null
);

alter table public_books enable row level security;

create policy "anyone can read public books"
on public_books for select
to anon, authenticated
using (true);

insert into public_books (title, author) values
  ('Dune', 'Frank Herbert'),
  ('The Hobbit', 'J.R.R. Tolkien'),
  ('Neuromancer', 'William Gibson');

-- private table: only logged in users can read, shown on the home screen
create table private_books (
  id bigint generated always as identity primary key,
  title text not null,
  author text not null
);

alter table private_books enable row level security;

create policy "logged in users can read private books"
on private_books for select
to authenticated
using (true);

insert into private_books (title, author) values
  ('Project Hail Mary', 'Andy Weir'),
  ('The Name of the Wind', 'Patrick Rothfuss'),
  ('Circe', 'Madeline Miller'),
  ('Piranesi', 'Susanna Clarke');
```

### How the tables are protected

| Table           | Who can read it          | Where it shows up |
| --------------- | ------------------------ | ----------------- |
| `public_books`  | Anyone, logged in or not | Sign Up screen    |
| `private_books` | Logged in users only     | Home screen       |

Both tables have Row Level Security turned on. If you're logged out, Supabase returns nothing from `private_books`, even if you query it directly.

## Test Account

- **Email:** a.testforthisassignment@gmail.com
- **Password:** Test1234

## AI Disclosure

Claude (Anthropic's AI assistant) was used during this project to:

- help with the styling of the app (shared auth styles and the input, button and error components)
- give suggestions while we built and debugged features
- explain syntax and concepts we didn't understand
- write this README
