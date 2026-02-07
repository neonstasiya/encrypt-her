import { AccessibleHeader } from "@/components/AccessibleHeader";
import { Card } from "@/components/ui/card";
import { Calendar, User, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AccessibleFooter } from "@/components/AccessibleFooter";
import { SkipLink } from "@/components/SkipLink";
import { usePageTitle } from "@/hooks/usePageTitle";
import { supabase } from "@/integrations/supabase/client";
import BlogContributionForm from "@/components/BlogContributionForm";

const Blog = () => {
  usePageTitle();
  const [isOpen, setIsOpen] = useState(false);

  const { data: posts } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, author_name, published_at')
        .eq('status', 'published')
        .order('published_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });
  
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
          </header>

          {/* Dynamic posts from database */}
          {posts && posts.length > 0 && (
            <section aria-labelledby="recent-posts">
              <h2 id="recent-posts" className="text-2xl font-bold text-foreground mb-6">Recent Posts</h2>
              <div className="space-y-4">
                {posts.map((post) => (
                  <Link key={post.id} to={`/blog/${post.slug}`} className="block">
                    <Card className="p-6 hover:bg-muted/50 transition-colors focus-within:ring-2 focus-within:ring-ring">
                      <h3 className="text-xl font-semibold text-foreground mb-2">{post.title}</h3>
                      {post.excerpt && <p className="text-muted-foreground mb-3">{post.excerpt}</p>}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{post.author_name}</span>
                        <span>•</span>
                        <time dateTime={post.published_at || ''}>
                          {new Date(post.published_at || '').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </time>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Featured article */}
          <Card className="p-6 hover:bg-muted/50 transition-colors">
            <article aria-labelledby="blog-article-heading">
              <h2 id="blog-article-heading" className="text-xl font-semibold text-foreground mb-2">
                The Growing Crisis: How Lack of Privacy Laws Puts Everyone at Risk
              </h2>
              <p className="text-muted-foreground mb-3">
                In an era where our entire lives are increasingly digital, the absence of comprehensive privacy laws has created a dangerous vulnerability that affects us all—but disproportionately impacts women and marginalized communities.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>EncryptHer Team</span>
                <span>•</span>
                <time dateTime="2025-10-13">October 13, 2025</time>
              </div>

              <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleTrigger 
                  className="flex items-center gap-2 text-primary hover:text-primary/80 font-semibold my-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded text-sm"
                  aria-expanded={isOpen}
                >
                  {isOpen ? "Read Less" : "Read More"}
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4 text-foreground text-sm">
                  <h3 className="text-lg font-bold mt-4 mb-2">The Current State of Privacy Protection</h3>
                  <p>
                    While the European Union has implemented GDPR and California has enacted CCPA, the United States lacks a federal privacy law that protects all citizens uniformly. This patchwork approach leaves massive gaps in protection, creating a digital Wild West where personal data is harvested, sold, and exploited with minimal oversight.
                  </p>

                  <h3 className="text-lg font-bold mt-4 mb-2">Why This Matters for Women's Safety</h3>
                  <p>The lack of robust privacy laws has particularly severe consequences for women:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Stalking and Harassment:</strong> Location data from apps and services can be purchased by anyone, including abusive partners or stalkers.</li>
                    <li><strong>Reproductive Privacy:</strong> Period-tracking apps and health data can be accessed by third parties.</li>
                    <li><strong>Intimate Image Abuse:</strong> Weak data protection laws make it easier for private photos to be shared without consent.</li>
                  </ul>

                  <p className="italic text-muted-foreground mt-4">
                    At EncryptHer, we believe that every woman deserves to feel safe—both in the physical world and online.
                  </p>
                </CollapsibleContent>
              </Collapsible>
            </article>
          </Card>

          {/* Contribution Form */}
          <BlogContributionForm />
        </div>
      </main>

      <AccessibleFooter />
    </div>
  );
};

export default Blog;
