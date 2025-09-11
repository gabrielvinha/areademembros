/*
  # Add avatar field to user profiles

  1. Changes
    - Add `avatar` column to `user_profiles` table to store selected avatar ID
    - Set default value to 'avatar1'

  2. Security
    - No changes to RLS policies needed
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'avatar'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN avatar text DEFAULT 'avatar1';
  END IF;
END $$;