CREATE TABLE public.site_pledges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT,
  agreed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_agent TEXT,
  skipped BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.site_pledges ENABLE ROW LEVEL SECURITY;

-- Anyone can record a pledge
CREATE POLICY "Public can record pledge"
ON public.site_pledges
FOR INSERT
TO public
WITH CHECK (true);

-- Block public reads
CREATE POLICY "Block public read pledges"
ON public.site_pledges
FOR SELECT
TO anon
USING (false);

-- Admins can read all
CREATE POLICY "Admins can read pledges"
ON public.site_pledges
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update pledges"
ON public.site_pledges
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete pledges"
ON public.site_pledges
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX idx_site_pledges_agreed_at ON public.site_pledges(agreed_at DESC);
CREATE INDEX idx_site_pledges_email ON public.site_pledges(email) WHERE email IS NOT NULL;