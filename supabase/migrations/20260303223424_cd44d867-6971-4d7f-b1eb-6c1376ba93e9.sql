
-- Table for emergency grant media
CREATE TABLE public.emergency_grant_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  file_url text NOT NULL,
  media_type text NOT NULL DEFAULT 'photo',
  caption text,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.emergency_grant_media ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Anyone can view grant media"
  ON public.emergency_grant_media FOR SELECT
  USING (true);

-- Admin insert
CREATE POLICY "Admins can insert grant media"
  ON public.emergency_grant_media FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Admin update
CREATE POLICY "Admins can update grant media"
  ON public.emergency_grant_media FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Admin delete
CREATE POLICY "Admins can delete grant media"
  ON public.emergency_grant_media FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('emergency-grant', 'emergency-grant', true);

-- Storage policies: public read
CREATE POLICY "Public can read emergency grant files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'emergency-grant');

-- Admin upload
CREATE POLICY "Admins can upload emergency grant files"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'emergency-grant' AND public.has_role(auth.uid(), 'admin'));

-- Admin delete files
CREATE POLICY "Admins can delete emergency grant files"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'emergency-grant' AND public.has_role(auth.uid(), 'admin'));
