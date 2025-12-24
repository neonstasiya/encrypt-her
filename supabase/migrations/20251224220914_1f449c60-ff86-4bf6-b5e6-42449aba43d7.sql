-- Allow anyone to upload to assets bucket temporarily
CREATE POLICY "Anyone can upload assets temporarily"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'assets');