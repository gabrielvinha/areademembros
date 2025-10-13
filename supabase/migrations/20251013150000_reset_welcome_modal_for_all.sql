/*
  # Reset welcome modal for all users

  1. Changes
    - Add `has_seen_welcome` column if it doesn't exist
    - Set all existing NULL values to false (so all users see the modal)
    - This ensures EVERY user, new or existing, will see the welcome modal
    - After clicking "entendi e quero começar", it will be set to true

  2. Security
    - No changes to RLS policies needed
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

UPDATE user_profiles SET has_seen_welcome = false WHERE has_seen_welcome IS NULL;
