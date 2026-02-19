
-- Create rate limiting table for edge functions (persistent across cold starts)
CREATE TABLE public.edge_function_rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address text NOT NULL,
  function_name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Index for fast lookups
CREATE INDEX idx_rate_limits_lookup 
ON public.edge_function_rate_limits (ip_address, function_name, created_at DESC);

-- Enable RLS (no public policies - only service role can access)
ALTER TABLE public.edge_function_rate_limits ENABLE ROW LEVEL SECURITY;

-- Cleanup function to remove entries older than 1 hour
CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.edge_function_rate_limits 
  WHERE created_at < now() - interval '1 hour';
END;
$$;
