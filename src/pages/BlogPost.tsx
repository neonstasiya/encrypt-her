import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import { AccessibleHeader } from "@/components/AccessibleHeader";
import { AccessibleFooter } from "@/components/AccessibleFooter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { usePageMeta } from "@/hooks/usePageMeta";
import MarkdownRenderer from "@/components/MarkdownRenderer";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: post, isLoading, error } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  usePageMeta(
    post?.title ? `${post.title} | EncryptHer Blog` : 'Blog Post | EncryptHer',
    post?.excerpt || undefined
  );

  const getReadingTime = (content: string) => {
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AccessibleHeader />
      
      <main id="main-content" className="flex-grow" role="main" aria-label="Blog post content">
        <article className="container mx-auto px-4 py-12 max-w-4xl">
          <nav aria-label="Back to blog">
            <Link to="/blog">
              <Button 
                variant="ghost" 
                className="mb-8 min-h-[44px] min-w-[44px]"
                aria-label="Back to all blog posts"
              >
                <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
                Back to Blog
              </Button>
            </Link>
          </nav>

          {isLoading && (
            <div className="space-y-4" aria-label="Loading blog post">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-64 w-full" />
            </div>
          )}

          {error && (
            <div className="text-center py-12" role="alert" aria-live="polite">
              <h1 className="text-2xl font-bold text-foreground mb-4">Error Loading Post</h1>
              <p className="text-muted-foreground mb-6">We couldn't load this blog post. Please try again later.</p>
              <Link to="/blog"><Button className="min-h-[44px]">Return to Blog</Button></Link>
            </div>
          )}

          {!isLoading && !error && !post && (
            <div className="text-center py-12" role="alert" aria-live="polite">
              <h1 className="text-2xl font-bold text-foreground mb-4">Post Not Found</h1>
              <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
              <Link to="/blog"><Button className="min-h-[44px]">Return to Blog</Button></Link>
            </div>
          )}

          {post && (
            <>
              <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {post.title}
                </h1>
                <div className="flex flex-wrap gap-4 text-muted-foreground text-sm">
                  <span className="flex items-center gap-2">
                    <User className="h-4 w-4" aria-hidden="true" />
                    <span>{post.author_name}</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    <time dateTime={post.published_at || post.created_at}>
                      {formatDate(post.published_at || post.created_at)}
                    </time>
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    <span>{getReadingTime(post.content)}</span>
                  </span>
                </div>
              </header>

              {post.featured_image && (
                <img 
                  src={post.featured_image} 
                  alt="" 
                  className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
                  aria-hidden="true"
                />
              )}

              <MarkdownRenderer 
                content={post.content} 
                className="text-foreground text-base leading-relaxed"
              />
            </>
          )}
        </article>
      </main>

      <AccessibleFooter />
    </div>
  );
};

export default BlogPost;
