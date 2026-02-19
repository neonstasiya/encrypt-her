
-- Drop existing overly permissive INSERT policies
DROP POLICY "Public can submit contributions" ON public.blog_contributions;
DROP POLICY "Public can submit contact messages" ON public.contact_messages;
DROP POLICY "Allow public email submissions" ON public.safety_guide_emails;

-- Recreate with tightened constraints

-- blog_contributions: status must be 'pending', admin_notes must be null
CREATE POLICY "Public can submit contributions"
ON public.blog_contributions
FOR INSERT
WITH CHECK (
  status = 'pending'
  AND admin_notes IS NULL
);

-- contact_messages: status must be 'unread'
CREATE POLICY "Public can submit contact messages"
ON public.contact_messages
FOR INSERT
WITH CHECK (
  status IS NULL OR status = 'unread'
);

-- safety_guide_emails: must be active, source must be expected value
CREATE POLICY "Allow public email submissions"
ON public.safety_guide_emails
FOR INSERT
WITH CHECK (
  (active IS NULL OR active = true)
  AND (source IS NULL OR source = 'safety_guide')
);
