/*
  # Update RLS policies for messages and subscribers tables

  1. Changes
    - Update messages table policies to allow anonymous inserts
    - Update subscribers table policies to allow anonymous inserts and reads
    - Add better error handling for duplicate subscribers

  2. Security
    - Maintain read-only access for posts
    - Allow anonymous message submissions
    - Allow newsletter subscriptions
*/

-- Messages table policies
DROP POLICY IF EXISTS "Anyone can submit messages" ON messages;

CREATE POLICY "Enable message submissions"
ON messages
FOR INSERT
TO public
WITH CHECK (
  -- Basic validation
  length(name) > 0 AND
  length(email) > 0 AND
  length(message) > 0
);

-- Subscribers table policies
DROP POLICY IF EXISTS "Enable insert for authenticated and anonymous users" ON subscribers;
DROP POLICY IF EXISTS "Enable read access for checking existing subscribers" ON subscribers;

CREATE POLICY "Enable newsletter subscriptions"
ON subscribers
FOR INSERT
TO public
WITH CHECK (
  -- Basic email validation
  email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
);

CREATE POLICY "Allow checking existing subscriptions"
ON subscribers
FOR SELECT
TO public
USING (true);

-- Add better duplicate handling
ALTER TABLE subscribers
DROP CONSTRAINT IF EXISTS subscribers_email_key,
ADD CONSTRAINT subscribers_email_key UNIQUE (email);