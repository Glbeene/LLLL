/*
  # Contact Form and Subscriber Integration
  
  1. New Function
    - Creates a function to handle both message creation and subscriber check
    - Ensures atomic operations
    - Handles duplicate subscribers gracefully
  
  2. Security
    - Maintains existing RLS policies
    - Safe handling of concurrent operations
*/

-- Create function to handle both message and subscriber in one transaction
CREATE OR REPLACE FUNCTION public.handle_message_and_subscriber(
  p_name TEXT,
  p_email TEXT,
  p_message TEXT
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_message_id uuid;
BEGIN
  -- Insert message
  INSERT INTO public.messages (name, email, message)
  VALUES (p_name, p_email, p_message)
  RETURNING id INTO v_message_id;

  -- Try to add subscriber if not exists
  INSERT INTO public.subscribers (email)
  VALUES (p_email)
  ON CONFLICT (email) DO NOTHING;

  RETURN v_message_id;
END;
$$;