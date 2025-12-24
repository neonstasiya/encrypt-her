-- Create public storage bucket for assets
INSERT INTO storage.buckets (id, name, public)
VALUES ('assets', 'assets', true);

-- Allow public read access to assets bucket
CREATE POLICY "Public can view assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'assets');

-- Allow admins to upload to assets bucket
CREATE POLICY "Admins can upload assets"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'assets' AND public.has_role(auth.uid(), 'admin'));

-- Allow admins to delete from assets bucket
CREATE POLICY "Admins can delete assets"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'assets' AND public.has_role(auth.uid(), 'admin'));