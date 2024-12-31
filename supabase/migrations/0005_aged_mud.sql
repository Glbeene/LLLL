/*
  # Fix messages table RLS policies

  1. Changes
    - Update messages table RLS policy to properly allow public submissions
    - Add better validation constraints
    - Add created_at index for performance
*/

-- Drop existing policy
DROP POLICY IF EXISTS "Allow public message submissions" ON messages;

-- Create new policy with proper permissions
CREATE POLICY "Enable public message submissions"
ON messages
FOR INSERT
TO public
WITH CHECK (
  -- Validate required fields
  name IS NOT NULL AND
  email IS NOT NULL AND
  message IS NOT NULL AND
  
  -- Length validation
  length(name) >= 2 AND
  length(name) <= 100 AND
  length(email) >= 5 AND
  length(email) <= 255 AND
  length(message) >= 10 AND
  length(message) <= 2000 AND
  
  -- Email format validation
  email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
);

-- Add index for created_at if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_messages_created_at 
ON messages(created_at DESC);

-- Add table constraints
ALTER TABLE messages
ADD CONSTRAINT messages_name_length CHECK (length(name) >= 2 AND length(name) <= 100),
ADD CONSTRAINT messages_email_length CHECK (length(email) >= 5 AND length(email) <= 255),
ADD CONSTRAINT messages_message_length CHECK (length(message) >= 10 AND length(message) <= 2000);