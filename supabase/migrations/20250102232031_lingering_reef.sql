/*
  # Contact Form Subscriber Integration
  
  1. New Trigger
    - Creates a trigger to automatically add contact form submissions to subscribers
    - Prevents duplicate subscriptions
    - Sets subscription date to message creation date
  
  2. Security
    - Maintains existing RLS policies
    - Safe handling of duplicate emails
*/

-- Create function to handle subscriber insertion
CREATE OR REPLACE FUNCTION public.handle_contact_subscriber()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into subscribers if email doesn't exist
  INSERT INTO public.subscribers (email, subscribed_at)
  VALUES (NEW.email, NEW.created_at)
  ON CONFLICT (email) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for messages table
DROP TRIGGER IF EXISTS contact_to_subscriber ON public.messages;
CREATE TRIGGER contact_to_subscriber
  AFTER INSERT ON public.messages
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_contact_subscriber();