import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Edit, Trash2, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { AccessibleHeader } from "@/components/AccessibleHeader";
import { AccessibleFooter } from "@/components/AccessibleFooter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { usePageMeta } from "@/hooks/usePageMeta";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  status: string;
  author_name: string;
  created_at: string;
  published_at: string | null;
}

const AdminBlog = () => {
  usePageMeta("Manage Blog Posts | Admin | EncryptHer");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['admin-blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, slug, status, author_name, created_at, published_at')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as BlogPost[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      toast({
        title: "Post deleted",
        description: "The blog post has been permanently deleted.",
      });
      setDeleteId(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete post. You may not have admin permissions.",
        variant: "destructive",
      });
      console.error('Delete error:', error);
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: async ({ id, newStatus }: { id: string; newStatus: string }) => {
      const updateData: { status: string; published_at?: string | null } = { 
        status: newStatus 
      };
      
      if (newStatus === 'published') {
        updateData.published_at = new Date().toISOString();
      }
      
      const { error } = await supabase
        .from('blog_posts')
        .update(updateData)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      toast({
        title: variables.newStatus === 'published' ? "Post published" : "Post unpublished",
        description: variables.newStatus === 'published' 
          ? "The blog post is now visible to the public."
          : "The blog post has been set to draft.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update post status. You may not have admin permissions.",
        variant: "destructive",
      });
      console.error('Status update error:', error);
    },
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AccessibleHeader />
      
      <main id="main-content" className="flex-grow container mx-auto px-4 py-12" role="main" aria-label="Blog post management">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/admin">
              <Button variant="ghost" className="min-h-[44px]" aria-label="Back to admin dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
                Dashboard
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-foreground">Manage Blog Posts</h1>
          </div>
          <Button 
            onClick={() => navigate('/admin/blog/new')}
            className="min-h-[44px]"
          >
            <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
            New Post
          </Button>
        </div>

        {error && (
          <div 
            className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6"
            role="alert"
          >
            <p className="text-destructive">
              Failed to load blog posts. You may not have admin permissions.
            </p>
          </div>
        )}

        {isLoading ? (
          <p className="text-muted-foreground" aria-live="polite">Loading posts...</p>
        ) : posts && posts.length === 0 ? (
          <div className="text-center py-12 border rounded-lg bg-card">
            <p className="text-muted-foreground mb-4">No blog posts yet.</p>
            <Button onClick={() => navigate('/admin/blog/new')} className="min-h-[44px]">
              Create Your First Post
            </Button>
          </div>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts?.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>
                      <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                        {post.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{post.author_name}</TableCell>
                    <TableCell>{formatDate(post.created_at)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleStatusMutation.mutate({
                            id: post.id,
                            newStatus: post.status === 'published' ? 'draft' : 'published'
                          })}
                          aria-label={post.status === 'published' ? 'Unpublish post' : 'Publish post'}
                          className="min-h-[44px] min-w-[44px]"
                        >
                          {post.status === 'published' ? (
                            <EyeOff className="h-4 w-4" aria-hidden="true" />
                          ) : (
                            <Eye className="h-4 w-4" aria-hidden="true" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => navigate(`/admin/blog/edit/${post.id}`)}
                          aria-label={`Edit ${post.title}`}
                          className="min-h-[44px] min-w-[44px]"
                        >
                          <Edit className="h-4 w-4" aria-hidden="true" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteId(post.id)}
                          aria-label={`Delete ${post.title}`}
                          className="min-h-[44px] min-w-[44px] text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <div className="mt-8">
          <Link to="/admin/contributions">
            <Button variant="outline" className="min-h-[44px]">
              View Blog Contributions
            </Button>
          </Link>
        </div>
      </main>

      <AccessibleFooter />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this blog post? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="min-h-[44px]">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              className="min-h-[44px] bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminBlog;
