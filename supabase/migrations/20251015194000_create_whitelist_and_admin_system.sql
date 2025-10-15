/*
  # Create Whitelist Access and Admin System

  1. New Tables
    - `whitelist_access`
      - `id` (uuid, primary key)
      - `email` (text, unique) - Email address with special access
      - `modules` (text[]) - Array of module IDs to unlock
      - `notes` (text) - Optional notes about why access was granted
      - `expires_at` (timestamptz) - Optional expiration date
      - `created_at` (timestamptz)
      - `created_by` (uuid) - Admin who created this entry

    - `admin_users`
      - `id` (uuid, primary key, references auth.users)
      - `created_at` (timestamptz)
      - `created_by` (uuid) - Admin who granted this permission

  2. Security
    - Enable RLS on both tables
    - Only admins can read/write whitelist_access
    - Only admins can read admin_users
    - Add policies for admin access control

  3. Indexes
    - Add index on whitelist_access.email for fast lookups
    - Add index on admin_users.id
*/

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Create whitelist_access table
CREATE TABLE IF NOT EXISTS whitelist_access (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  modules text[] DEFAULT '{}',
  notes text,
  expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE whitelist_access ENABLE ROW LEVEL SECURITY;

-- RLS Policies for admin_users
CREATE POLICY "Only admins can read admin list"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Only admins can insert new admins"
  ON admin_users
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- RLS Policies for whitelist_access
CREATE POLICY "Admins can read whitelist"
  ON whitelist_access
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Admins can insert whitelist entries"
  ON whitelist_access
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Admins can update whitelist entries"
  ON whitelist_access
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Admins can delete whitelist entries"
  ON whitelist_access
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Policy to allow users to check their own whitelist status
CREATE POLICY "Users can check if their email is whitelisted"
  ON whitelist_access
  FOR SELECT
  TO authenticated
  USING (
    email = (SELECT email FROM auth.users WHERE id = auth.uid())
    AND (expires_at IS NULL OR expires_at > now())
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_whitelist_access_email ON whitelist_access(email);
CREATE INDEX IF NOT EXISTS idx_whitelist_access_expires_at ON whitelist_access(expires_at);
CREATE INDEX IF NOT EXISTS idx_admin_users_id ON admin_users(id);

-- Function to check if a user is an admin
CREATE OR REPLACE FUNCTION is_admin(user_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users WHERE id = user_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
