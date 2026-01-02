-- Create function to update timestamps (if not exists)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create safety_resources table for state-by-state resources
CREATE TABLE public.safety_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  state TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('police', 'gun_training', 'self_defense', 'victim_advocacy', 'private_investigator', 'legal_aid', 'crisis_hotline', 'shelter', 'other')),
  name TEXT NOT NULL,
  description TEXT,
  phone TEXT,
  website TEXT,
  address TEXT,
  city TEXT,
  is_national BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.safety_resources ENABLE ROW LEVEL SECURITY;

-- Public read access for all resources
CREATE POLICY "Anyone can view resources"
ON public.safety_resources
FOR SELECT
USING (true);

-- Admin can insert resources
CREATE POLICY "Admin can insert resources"
ON public.safety_resources
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Admin can update resources
CREATE POLICY "Admin can update resources"
ON public.safety_resources
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admin can delete resources
CREATE POLICY "Admin can delete resources"
ON public.safety_resources
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create indexes for faster lookups
CREATE INDEX idx_safety_resources_state ON public.safety_resources(state);
CREATE INDEX idx_safety_resources_category ON public.safety_resources(category);
CREATE INDEX idx_safety_resources_national ON public.safety_resources(is_national);

-- Create updated_at trigger
CREATE TRIGGER update_safety_resources_updated_at
BEFORE UPDATE ON public.safety_resources
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();