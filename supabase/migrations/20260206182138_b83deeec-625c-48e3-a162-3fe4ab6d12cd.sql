CREATE POLICY "Block public read" ON public.blog_contributions FOR SELECT TO anon USING (false);
CREATE POLICY "Block public read" ON public.contact_messages FOR SELECT TO anon USING (false);