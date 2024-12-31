/*
  # Fix RLS Policies

  1. Changes
    - Update subscribers table RLS policy to allow inserts
    - Add policy for checking existing subscribers
    - Add policy for reading subscriber data
*/

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Anyone can subscribe" ON subscribers;

-- Create new policies for subscribers table
CREATE POLICY "Enable insert for authenticated and anonymous users" 
  ON subscribers
  FOR INSERT 
  TO public
  WITH CHECK (true);

CREATE POLICY "Enable read access for checking existing subscribers" 
  ON subscribers
  FOR SELECT 
  TO public
  USING (true);

-- Add index for email lookups
CREATE INDEX IF NOT EXISTS idx_subscribers_email 
  ON subscribers(email);