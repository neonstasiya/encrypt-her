import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Save, Send, Upload, Loader2 } from "lucide-react";
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
  content: z.string().trim().min(1, "Content is required"),
  author_name: z.string().trim().min(1, "Author name is required").max(100, "Author name must be less than 100 characters"),
  featured_image: z.string().optional().or(z.literal('')),
});

type BlogPostFormData = z.infer<typeof blogPostSchema>;

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

const AdminBlogEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const isEditing = !!id;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  usePageTitle(isEditing ? "Edit Blog Post | Admin | EncryptHer" : "New Blog Post | Admin | EncryptHer");

  const [formData, setFormData] = useState<BlogPostFormData>({
    title: '',
    content: '',
    author_name: 'EncryptHer Team',
    featured_image: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof BlogPostFormData, string>>>({});

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
        content: existingPost.content,
        author_name: existingPost.author_name,
        featured_image: existingPost.featured_image || '',
      });
    }
  }, [existingPost]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({ title: "Invalid file", description: "Please select an image file.", variant: "destructive" });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "File too large", description: "Image must be under 5MB.", variant: "destructive" });
      return;
    }

    setUploading(true);
    try {
      const ext = file.name.split('.').pop();
      const fileName = `blog/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from('assets')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('assets')
        .getPublicUrl(fileName);

      setFormData(prev => ({ ...prev, featured_image: publicUrl }));
      toast({ title: "Image uploaded", description: "Featured image has been set." });
    } catch (error) {
      console.error('Upload error:', error);
      toast({ title: "Upload failed", description: "Could not upload image. You may not have admin permissions.", variant: "destructive" });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const saveMutation = useMutation({
    mutationFn: async ({ data, publish }: { data: BlogPostFormData; publish: boolean }) => {
      const slug = generateSlug(data.title);
      const postData = {
        title: data.title,
        slug,
        content: data.content,
        author_name: data.author_name,
        featured_image: data.featured_image || null,
        excerpt: null,
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
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
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
            <Label>Featured Image</Label>
            <div className="flex items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                aria-label="Upload featured image"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="min-h-[44px]"
              >
                {uploading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" aria-hidden="true" />
                ) : (
                  <Upload className="h-4 w-4 mr-2" aria-hidden="true" />
                )}
                {uploading ? 'Uploading...' : 'Upload Image'}
              </Button>
              {formData.featured_image && (
                <div className="flex items-center gap-2">
                  <img 
                    src={formData.featured_image} 
                    alt="Featured image preview" 
                    className="h-10 w-10 object-cover rounded"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setFormData(prev => ({ ...prev, featured_image: '' }))}
                    className="text-muted-foreground text-xs"
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder={"Write your blog post content here...\n\n## Section Heading\n\nParagraph text here.\n\n- Bullet point\n- Another point\n\n**Bold text** for emphasis."}
              rows={15}
              aria-invalid={!!errors.content}
              aria-describedby={errors.content ? "content-error" : undefined}
              className="min-h-[300px] font-mono text-sm"
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

          <div className="pt-6 text-xs text-muted-foreground space-y-1">
            <p className="font-semibold text-sm text-foreground mb-2">Formatting Guide</p>
            <p><code className="bg-muted px-1 rounded">## Heading</code> — Section heading (large, bold)</p>
            <p><code className="bg-muted px-1 rounded">### Subheading</code> — Smaller subheading</p>
            <p><code className="bg-muted px-1 rounded">**bold text**</code> — <strong>Bold text</strong></p>
            <p><code className="bg-muted px-1 rounded">*italic text*</code> — <em>Italic text</em></p>
            <p><code className="bg-muted px-1 rounded">- item</code> — Bullet list item</p>
            <p><code className="bg-muted px-1 rounded">[link text](https://url)</code> — Clickable link</p>
            <p className="pt-1">Separate paragraphs with a blank line.</p>
          </div>
        </form>
      </main>

      <AccessibleFooter />
    </div>
  );
};

export default AdminBlogEditor;
