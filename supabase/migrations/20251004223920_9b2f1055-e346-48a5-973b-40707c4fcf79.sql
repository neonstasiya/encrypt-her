-- Create table for safety guide email submissions
CREATE TABLE public.safety_guide_emails (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  source TEXT DEFAULT 'safety_guide'
);

-- Enable Row Level Security
ALTER TABLE public.safety_guide_emails ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert their email (public form)
CREATE POLICY "Allow public email submissions"
ON public.safety_guide_emails
FOR INSERT
TO public
WITH CHECK (true);

-- Create policy to allow public to read (optional, remove if you want emails private)
CREATE POLICY "Allow public read access"
ON public.safety_guide_emails
FOR SELECT
TO public
USING (true);

-- Create index on email for faster lookups
CREATE INDEX idx_safety_guide_emails_email ON public.safety_guide_emails(email);

-- Create index on created_at for sorting
CREATE INDEX idx_safety_guide_emails_created_at ON public.safety_guide_emails(created_at DESC);