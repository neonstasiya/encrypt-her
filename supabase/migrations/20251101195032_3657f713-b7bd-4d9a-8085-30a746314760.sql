-- Fix: Email Database Lacks Update/Delete Protection
-- Add explicit UPDATE and DELETE policies for safety_guide_emails

CREATE POLICY "Admin update emails" ON public.safety_guide_emails
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin delete emails" ON public.safety_guide_emails
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Fix: Contact Form Data Not Persisted
-- Create contact_messages table with proper RLS

CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  status text DEFAULT 'unread'
);

-- Enable RLS on contact_messages
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow public to insert contact messages
CREATE POLICY "Public can submit contact messages" ON public.contact_messages
  FOR INSERT
  WITH CHECK (true);

-- Only admins can read contact messages
CREATE POLICY "Admin can read contact messages" ON public.contact_messages
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can update contact messages (e.g., mark as read)
CREATE POLICY "Admin can update contact messages" ON public.contact_messages
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete contact messages
CREATE POLICY "Admin can delete contact messages" ON public.contact_messages
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));