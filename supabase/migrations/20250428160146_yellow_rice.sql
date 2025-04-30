/*
  # Create users table

  1. Table Structure
    - `users` table with fields for user profile information:
      - `id` (uuid, primary key)
      - `full_name` (text)
      - `age` (integer)
      - `gender` (text)
      - `education_level` (text)
      - `email` (text, unique)
      - `created_at` (timestamp)
  
  2. Security
    - Enable Row Level Security (RLS) on the users table
    - Add policy for users to read and update only their own data
    - Add policy for authenticated users to insert their own data
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text NOT NULL,
  age integer NOT NULL,
  gender text NOT NULL,
  education_level text NOT NULL,
  email text UNIQUE NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies for secure access
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own data"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);