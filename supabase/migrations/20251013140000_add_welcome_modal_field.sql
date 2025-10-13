/*
  # Add welcome modal tracking to user profiles

  1. Changes
    - Add `has_seen_welcome` column to `user_profiles` table
    - Default value is false (user has not seen the welcome modal yet)
    - This field will be set to true after the user completes the welcome tutorial

  2. Security
    - No changes to RLS policies needed
    - Users can already update their own profile
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'has_seen_welcome'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN has_seen_welcome boolean DEFAULT false;
  END IF;
END $$;
