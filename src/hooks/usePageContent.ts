import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";

export interface PageContent {
  [key: string]: string | PageContent;
}

export function usePageContent(pageKey: string) {
  return useQuery({
    queryKey: ['page-content', pageKey],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('app_metadata')
        .select('value')
        .eq('key', `page_${pageKey}`)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching page content:', error);
        return null;
      }
      
      return data?.value as PageContent | null;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
}

export function useUpdatePageContent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ pageKey, content }: { pageKey: string; content: PageContent }) => {
      const key = `page_${pageKey}`;
      
      // Check if record exists
      const { data: existing } = await supabase
        .from('app_metadata')
        .select('id')
        .eq('key', key)
        .maybeSingle();
      
      if (existing) {
        // Update existing
        const { error } = await supabase
          .from('app_metadata')
          .update({ value: content as unknown as Json, updated_at: new Date().toISOString() })
          .eq('key', key);
        
        if (error) throw error;
      } else {
        // Insert new
        const { error } = await supabase
          .from('app_metadata')
          .insert({ key, value: content as unknown as Json });
        
        if (error) throw error;
      }
      
      return { pageKey, content };
    },
    onSuccess: ({ pageKey }) => {
      queryClient.invalidateQueries({ queryKey: ['page-content', pageKey] });
      queryClient.invalidateQueries({ queryKey: ['all-page-content'] });
    },
  });
}

export function useAllPageContent() {
  return useQuery({
    queryKey: ['all-page-content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('app_metadata')
        .select('key, value')
        .like('key', 'page_%');
      
      if (error) {
        console.error('Error fetching all page content:', error);
        return {};
      }
      
      const contentMap: Record<string, PageContent> = {};
      data?.forEach(item => {
        const pageKey = item.key.replace('page_', '');
        contentMap[pageKey] = item.value as PageContent;
      });
      
      return contentMap;
    },
  });
}
