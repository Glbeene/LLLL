-- Drop existing policy
DROP POLICY IF EXISTS "Allow message submissions" ON messages;

-- Create simpler policy that matches subscribers table approach
CREATE POLICY "Enable message submissions"
ON messages
FOR INSERT
TO public
WITH CHECK (true);

-- Ensure RLS is enabled
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;