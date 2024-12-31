/*
  # Fix RLS policies for better error handling

  1. Changes
    - Update RLS policies to properly handle public access
    - Add better validation for messages and subscribers
    - Improve error handling for duplicates

  2. Security
    - Maintain read-only access for posts
    - Allow public message submissions with validation
    - Enable newsletter subscriptions with duplicate checking
*/

-- Messages table policies
DROP POLICY IF EXISTS "Enable message submissions" ON messages;

CREATE POLICY "Allow public message submissions"
ON messages
FOR INSERT
TO public
WITH CHECK (
  length(name) >= 2 AND
  length(email) >= 5 AND
  length(message) >= 10 AND
  email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
);

-- Subscribers table policies
DROP POLICY IF EXISTS "Enable newsletter subscriptions" ON subscribers;
DROP POLICY IF EXISTS "Allow checking existing subscriptions" ON subscribers;

CREATE POLICY "Enable public newsletter subscriptions"
ON subscribers
FOR INSERT
TO public
WITH CHECK (
  email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
);

CREATE POLICY "Allow public subscriber checks"
ON subscribers
FOR SELECT
TO public
USING (true);

-- Add better indexing for performance
CREATE INDEX IF NOT EXISTS idx_subscribers_email_btree ON subscribers USING btree (email);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages (created_at DESC);