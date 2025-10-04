-- Extend safety_guide_emails table to support newsletter functionality
ALTER TABLE public.safety_guide_emails 
ADD COLUMN IF NOT EXISTS interests jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS subscribed_at timestamp with time zone DEFAULT now(),
ADD COLUMN IF NOT EXISTS active boolean DEFAULT true;

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_safety_guide_emails_source ON public.safety_guide_emails(source);
CREATE INDEX IF NOT EXISTS idx_safety_guide_emails_active ON public.safety_guide_emails(active);

-- Add comment for documentation
COMMENT ON COLUMN public.safety_guide_emails.interests IS 'Array of user interests: classes, guides, news, tips';
COMMENT ON COLUMN public.safety_guide_emails.active IS 'Subscription status for unsubscribe management';