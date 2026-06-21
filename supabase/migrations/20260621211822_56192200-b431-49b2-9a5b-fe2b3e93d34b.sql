
-- 1. edge_function_rate_limits: add restrictive blocks + service-role-only writes
CREATE POLICY "Block anon access to rate limits"
  ON public.edge_function_rate_limits AS RESTRICTIVE FOR ALL TO anon
  USING (false) WITH CHECK (false);

CREATE POLICY "Block authenticated access to rate limits"
  ON public.edge_function_rate_limits AS RESTRICTIVE FOR ALL TO authenticated
  USING (false) WITH CHECK (false);

CREATE POLICY "Service role manages rate limits"
  ON public.edge_function_rate_limits FOR ALL TO public
  USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');

-- 2. email_send_log: explicit block for anon/authenticated
CREATE POLICY "Block anon access to send log"
  ON public.email_send_log AS RESTRICTIVE FOR ALL TO anon
  USING (false) WITH CHECK (false);

CREATE POLICY "Block authenticated access to send log"
  ON public.email_send_log AS RESTRICTIVE FOR ALL TO authenticated
  USING (false) WITH CHECK (false);

-- 3. email_unsubscribe_tokens: explicit block for anon/authenticated
CREATE POLICY "Block anon access to unsubscribe tokens"
  ON public.email_unsubscribe_tokens AS RESTRICTIVE FOR ALL TO anon
  USING (false) WITH CHECK (false);

CREATE POLICY "Block authenticated access to unsubscribe tokens"
  ON public.email_unsubscribe_tokens AS RESTRICTIVE FOR ALL TO authenticated
  USING (false) WITH CHECK (false);

-- 4. suppressed_emails: explicit block for anon/authenticated
CREATE POLICY "Block anon access to suppressed emails"
  ON public.suppressed_emails AS RESTRICTIVE FOR ALL TO anon
  USING (false) WITH CHECK (false);

CREATE POLICY "Block authenticated access to suppressed emails"
  ON public.suppressed_emails AS RESTRICTIVE FOR ALL TO authenticated
  USING (false) WITH CHECK (false);

-- 5. email_send_state: explicit block for anon/authenticated (service role policy already exists)
CREATE POLICY "Block anon access to send state"
  ON public.email_send_state AS RESTRICTIVE FOR ALL TO anon
  USING (false) WITH CHECK (false);

CREATE POLICY "Block authenticated access to send state"
  ON public.email_send_state AS RESTRICTIVE FOR ALL TO authenticated
  USING (false) WITH CHECK (false);

-- 6. Tighten site_pledges INSERT (previously WITH CHECK true)
DROP POLICY IF EXISTS "Public can record pledge" ON public.site_pledges;
CREATE POLICY "Public can record pledge"
  ON public.site_pledges FOR INSERT TO public
  WITH CHECK (
    (email IS NULL OR length(email) <= 255)
    AND (user_agent IS NULL OR length(user_agent) <= 1000)
  );

-- 7. Lock down has_role() execution to backend roles only.
-- RLS policies invoke it as SECURITY DEFINER regardless of EXECUTE grants on the caller.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;
