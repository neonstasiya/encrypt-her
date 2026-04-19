import { AccessibleHeader } from "@/components/AccessibleHeader";
import { Card } from "@/components/ui/card";
import { Clock, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AccessibleFooter } from "@/components/AccessibleFooter";
import { SkipLink } from "@/components/SkipLink";
import { usePageMeta } from "@/hooks/usePageMeta";
import { supabase } from "@/integrations/supabase/client";
import BlogContributionForm from "@/components/BlogContributionForm";
import { Badge } from "@/components/ui/badge";

const estimateReadTime = (content: string | null): string => {
  if (!content) return "1 min read";
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
};

const Blog = () => {
  usePageMeta();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: posts } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, author_name, published_at, content, category, featured_image')
        .eq('status', 'published')
        .order('published_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const categories = posts
    ? Array.from(new Set(posts.map(p => p.category).filter(Boolean))) as string[]
    : [];

  const filteredPosts = selectedCategory
    ? posts?.filter(p => p.category === selectedCategory)
    : posts;

  return (
    <div className="min-h-screen bg-background">
      <SkipLink />
      <AccessibleHeader />

      <main id="main-content" role="main" className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Blog
            </h1>
            <p className="text-lg text-muted-foreground">
              Insights on digital privacy, safety, and empowerment
            </p>

            {categories.length > 0 && (
              <nav aria-label="Filter by category" className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                    selectedCategory === null
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-secondary text-secondary-foreground border-transparent hover:bg-secondary/80'
                  }`}
                >
                  All
                </button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                      selectedCategory === cat
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-secondary text-secondary-foreground border-transparent hover:bg-secondary/80'
                    }`}
                  >
                    <Tag className="h-3 w-3 mr-1" aria-hidden="true" />
                    {cat}
                  </button>
                ))}
              </nav>
            )}
          </header>

          {filteredPosts && filteredPosts.length > 0 && (
            <section aria-labelledby="recent-posts">
              <h2 id="recent-posts" className="text-2xl font-bold text-foreground mb-6">
                {selectedCategory ? selectedCategory : 'Recent Posts'}
              </h2>
              <div className="space-y-4">
                {filteredPosts.map((post) => {
                  const isEmergencyGrant = post.slug?.includes('emergency-grant') || post.title?.toLowerCase().includes('emergency grant');
                  const highlightTitle = (title: string) => {
                    const regex = /(EncryptHer\s+Emergency\s+Grant)/gi;
                    const parts = title.split(regex);
                    return parts.map((part, i) =>
                      regex.test(part) ? <span key={i} className="text-destructive">{part}</span> : part
                    );
                  };
                  return (
                  <Link key={post.id} to={`/blog/${post.slug}`} className="block">
                    <Card
                      className="relative overflow-hidden p-4 border-l-4 border-l-primary hover:shadow-lg transition-all focus-within:ring-2 focus-within:ring-ring"
                      style={
                        post.featured_image
                          ? {
                              backgroundImage: `linear-gradient(to right, hsl(var(--background) / 0.92), hsl(var(--background) / 0.75)), url(${post.featured_image})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                            }
                          : undefined
                      }
                    >
                      <div className="relative">
                        <div className="flex items-center gap-2 mb-1.5">
                          {post.category && (
                            <Badge
                              variant="secondary"
                              className="text-[10px] py-0 px-2 cursor-pointer hover:bg-secondary/60"
                              onClick={(e) => {
                                e.preventDefault();
                                setSelectedCategory(post.category);
                              }}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  setSelectedCategory(post.category);
                                }
                              }}
                            >
                              <Tag className="h-2.5 w-2.5 mr-1" aria-hidden="true" />
                              {post.category}
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-[10px] py-0 px-2 bg-background/70">
                            <Clock className="h-2.5 w-2.5 mr-1" aria-hidden="true" />
                            {estimateReadTime(post.content)}
                          </Badge>
                        </div>
                        <h3 className="text-base font-semibold text-foreground mb-1.5 leading-snug">{isEmergencyGrant ? highlightTitle(post.title) : post.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{post.author_name}</span>
                          <span>•</span>
                          <time dateTime={post.published_at || ''}>
                            {new Date(post.published_at || '').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </time>
                        </div>
                        <p className="text-primary font-medium text-xs mt-2">Read More →</p>
                      </div>
                    </Card>
                  </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* Contribution Form */}
          <BlogContributionForm />
        </div>
      </main>

      <AccessibleFooter />
    </div>
  );
};

export default Blog;
