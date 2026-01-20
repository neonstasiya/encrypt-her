import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Save, Send } from "lucide-react";
import { z } from "zod";
import { AccessibleHeader } from "@/components/AccessibleHeader";
import { AccessibleFooter } from "@/components/AccessibleFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { usePageTitle } from "@/hooks/usePageTitle";

const blogPostSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
  slug: z.string().trim().min(1, "Slug is required").max(200, "Slug must be less than 200 characters")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  excerpt: z.string().trim().max(500, "Excerpt must be less than 500 characters").optional(),
  content: z.string().trim().min(1, "Content is required"),
  author_name: z.string().trim().min(1, "Author name is required").max(100, "Author name must be less than 100 characters"),
  featured_image: z.string().url("Must be a valid URL").optional().or(z.literal('')),
});

type BlogPostFormData = z.infer<typeof blogPostSchema>;

const AdminBlogEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const isEditing = !!id;

  usePageTitle(isEditing ? "Edit Blog Post | Admin | EncryptHer" : "New Blog Post | Admin | EncryptHer");

  const [formData, setFormData] = useState<BlogPostFormData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author_name: 'EncryptHer Team',
    featured_image: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof BlogPostFormData, string>>>({});

  // Fetch existing post if editing
  const { data: existingPost, isLoading } = useQuery({
    queryKey: ['admin-blog-post', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (existingPost) {
      setFormData({
        title: existingPost.title,
        slug: existingPost.slug,
        excerpt: existingPost.excerpt || '',
        content: existingPost.content,
        author_name: existingPost.author_name,
        featured_image: existingPost.featured_image || '',
      });
    }
  }, [existingPost]);

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      title: value,
      slug: prev.slug || generateSlug(value),
    }));
  };

  const saveMutation = useMutation({
    mutationFn: async ({ data, publish }: { data: BlogPostFormData; publish: boolean }) => {
      const postData = {
        title: data.title,
        slug: data.slug,
        content: data.content,
        author_name: data.author_name,
        featured_image: data.featured_image || null,
        excerpt: data.excerpt || null,
        status: publish ? 'published' : 'draft',
        published_at: publish ? new Date().toISOString() : null,
      };

      if (isEditing) {
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([postData]);
        if (error) throw error;
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      toast({
        title: variables.publish ? "Post published!" : "Post saved",
        description: variables.publish 
          ? "Your blog post is now live."
          : "Your blog post has been saved as a draft.",
      });
      navigate('/admin/blog');
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to save post. You may not have admin permissions.",
        variant: "destructive",
      });
      console.error('Save error:', error);
    },
  });

  const handleSubmit = (publish: boolean) => {
    const result = blogPostSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof BlogPostFormData, string>> = {};
      result.error.errors.forEach(err => {
        const field = err.path[0] as keyof BlogPostFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    saveMutation.mutate({ data: result.data, publish });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <AccessibleHeader />
        <main className="flex-grow container mx-auto px-4 py-12" role="main">
          <p className="text-muted-foreground" aria-live="polite">Loading...</p>
        </main>
        <AccessibleFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AccessibleHeader />
      
      <main id="main-content" className="flex-grow container mx-auto px-4 py-12 max-w-4xl" role="main" aria-label="Blog post editor">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/admin/blog">
            <Button variant="ghost" className="min-h-[44px]" aria-label="Back to blog posts">
              <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
              Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">
            {isEditing ? 'Edit Blog Post' : 'New Blog Post'}
          </h1>
        </div>

        <form 
          onSubmit={(e) => { e.preventDefault(); handleSubmit(false); }}
          className="space-y-6"
          noValidate
        >
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Enter post title"
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? "title-error" : undefined}
              className="min-h-[44px]"
            />
            {errors.title && (
              <p id="title-error" className="text-sm text-destructive" role="alert">
                {errors.title}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">URL Slug *</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value.toLowerCase() }))}
              placeholder="url-friendly-slug"
              aria-invalid={!!errors.slug}
              aria-describedby={errors.slug ? "slug-error" : "slug-hint"}
              className="min-h-[44px]"
            />
            <p id="slug-hint" className="text-sm text-muted-foreground">
              This will be the URL: /blog/{formData.slug || 'your-slug'}
            </p>
            {errors.slug && (
              <p id="slug-error" className="text-sm text-destructive" role="alert">
                {errors.slug}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="author_name">Author Name *</Label>
            <Input
              id="author_name"
              value={formData.author_name}
              onChange={(e) => setFormData(prev => ({ ...prev, author_name: e.target.value }))}
              placeholder="Author name"
              aria-invalid={!!errors.author_name}
              aria-describedby={errors.author_name ? "author-error" : undefined}
              className="min-h-[44px]"
            />
            {errors.author_name && (
              <p id="author-error" className="text-sm text-destructive" role="alert">
                {errors.author_name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              placeholder="A brief summary of the post (optional)"
              rows={2}
              aria-invalid={!!errors.excerpt}
              aria-describedby={errors.excerpt ? "excerpt-error" : undefined}
              className="min-h-[88px]"
            />
            {errors.excerpt && (
              <p id="excerpt-error" className="text-sm text-destructive" role="alert">
                {errors.excerpt}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="featured_image">Featured Image URL</Label>
            <Input
              id="featured_image"
              type="url"
              value={formData.featured_image}
              onChange={(e) => setFormData(prev => ({ ...prev, featured_image: e.target.value }))}
              placeholder="https://example.com/image.jpg"
              aria-invalid={!!errors.featured_image}
              aria-describedby={errors.featured_image ? "image-error" : undefined}
              className="min-h-[44px]"
            />
            {errors.featured_image && (
              <p id="image-error" className="text-sm text-destructive" role="alert">
                {errors.featured_image}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Write your blog post content here..."
              rows={15}
              aria-invalid={!!errors.content}
              aria-describedby={errors.content ? "content-error" : undefined}
              className="min-h-[300px]"
            />
            {errors.content && (
              <p id="content-error" className="text-sm text-destructive" role="alert">
                {errors.content}
              </p>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSubmit(false)}
              disabled={saveMutation.isPending}
              className="min-h-[44px]"
            >
              <Save className="h-4 w-4 mr-2" aria-hidden="true" />
              {saveMutation.isPending ? 'Saving...' : 'Save Draft'}
            </Button>
            <Button
              type="button"
              onClick={() => handleSubmit(true)}
              disabled={saveMutation.isPending}
              className="min-h-[44px]"
            >
              <Send className="h-4 w-4 mr-2" aria-hidden="true" />
              {saveMutation.isPending ? 'Publishing...' : 'Publish'}
            </Button>
          </div>
        </form>
      </main>

      <AccessibleFooter />
    </div>
  );
};

export default AdminBlogEditor;
