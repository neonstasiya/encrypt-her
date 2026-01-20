-- Allow admins to insert content
CREATE POLICY "Admin can insert metadata"
  ON public.app_metadata FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to update content
CREATE POLICY "Admin can update metadata"
  ON public.app_metadata FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to delete content
CREATE POLICY "Admin can delete metadata"
  ON public.app_metadata FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));