/*
  # Fix Messages Table RLS Policies

  1. Changes
    - Drop existing RLS policies for messages table
    - Create new policy allowing public message submissions
    - Add validation constraints
  
  2. Security
    - Enable RLS on messages table
    - Add policy for public message submissions
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable public message submissions" ON messages;
DROP POLICY IF EXISTS "Allow public message submissions" ON messages;

-- Enable RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create new policy for message submissions
CREATE POLICY "Allow message submissions"
ON messages
FOR INSERT
TO public
WITH CHECK (
  -- Required fields
  name IS NOT NULL AND
  email IS NOT NULL AND
  message IS NOT NULL AND
  
  -- Length constraints
  length(name) BETWEEN 2 AND 100 AND
  length(email) BETWEEN 5 AND 255 AND
  length(message) BETWEEN 10 AND 2000 AND
  
  -- Email format validation
  email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
);

-- Add table constraints if they don't exist
DO $$ BEGIN
  ALTER TABLE messages
    ADD CONSTRAINT messages_name_length 
    CHECK (length(name) BETWEEN 2 AND 100);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE messages
    ADD CONSTRAINT messages_email_length 
    CHECK (length(email) BETWEEN 5 AND 255);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE messages
    ADD CONSTRAINT messages_message_length 
    CHECK (length(message) BETWEEN 10 AND 2000);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;