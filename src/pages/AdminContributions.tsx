import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Eye, MessageSquare } from "lucide-react";
import { AccessibleHeader } from "@/components/AccessibleHeader";
import { AccessibleFooter } from "@/components/AccessibleFooter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { usePageTitle } from "@/hooks/usePageTitle";

interface BlogContribution {
  id: string;
  name: string;
  email: string;
  topic: string;
  story: string | null;
  status: string;
  admin_notes: string | null;
  created_at: string;
}

const statusColors: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  pending: 'secondary',
  reviewed: 'outline',
  approved: 'default',
  declined: 'destructive',
};

const AdminContributions = () => {
  usePageTitle("Blog Contributions | Admin | EncryptHer");
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [selectedContribution, setSelectedContribution] = useState<BlogContribution | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [newStatus, setNewStatus] = useState<string>('');

  const { data: contributions, isLoading, error } = useQuery({
    queryKey: ['admin-contributions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_contributions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as BlogContribution[];
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, status, notes }: { id: string; status: string; notes: string }) => {
      const { error } = await supabase
        .from('blog_contributions')
        .update({ status, admin_notes: notes || null })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-contributions'] });
      toast({
        title: "Contribution updated",
        description: "The status has been updated successfully.",
      });
      setSelectedContribution(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update contribution. You may not have admin permissions.",
        variant: "destructive",
      });
      console.error('Update error:', error);
    },
  });

  const openDetails = (contribution: BlogContribution) => {
    setSelectedContribution(contribution);
    setAdminNotes(contribution.admin_notes || '');
    setNewStatus(contribution.status);
  };

  const handleUpdate = () => {
    if (selectedContribution) {
      updateMutation.mutate({
        id: selectedContribution.id,
        status: newStatus,
        notes: adminNotes,
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AccessibleHeader />
      
      <main id="main-content" className="flex-grow container mx-auto px-4 py-12" role="main" aria-label="Blog contribution management">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/admin/blog">
            <Button variant="ghost" className="min-h-[44px]" aria-label="Back to blog management">
              <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
              Blog Posts
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Blog Contributions</h1>
        </div>

        <p className="text-muted-foreground mb-6">
          Review and manage blog contribution submissions from the public.
        </p>

        {error && (
          <div 
            className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6"
            role="alert"
          >
            <p className="text-destructive">
              Failed to load contributions. You may not have admin permissions.
            </p>
          </div>
        )}

        {isLoading ? (
          <p className="text-muted-foreground" aria-live="polite">Loading contributions...</p>
        ) : contributions && contributions.length === 0 ? (
          <div className="text-center py-12 border rounded-lg bg-card">
            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" aria-hidden="true" />
            <p className="text-muted-foreground">No contributions yet.</p>
          </div>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Topic</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contributions?.map((contribution) => (
                  <TableRow key={contribution.id}>
                    <TableCell className="font-medium">{contribution.name}</TableCell>
                    <TableCell className="max-w-xs truncate">{contribution.topic}</TableCell>
                    <TableCell>
                      <Badge variant={statusColors[contribution.status] || 'secondary'}>
                        {contribution.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(contribution.created_at)}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openDetails(contribution)}
                        aria-label={`View details for ${contribution.name}'s contribution`}
                        className="min-h-[44px] min-w-[44px]"
                      >
                        <Eye className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>

      <AccessibleFooter />

      <Dialog open={!!selectedContribution} onOpenChange={() => setSelectedContribution(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Contribution Details</DialogTitle>
            <DialogDescription>
              Review and update the status of this contribution.
            </DialogDescription>
          </DialogHeader>

          {selectedContribution && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Name</Label>
                  <p className="font-medium">{selectedContribution.name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Email</Label>
                  <p className="font-medium">
                    <a 
                      href={`mailto:${selectedContribution.email}`}
                      className="text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {selectedContribution.email}
                    </a>
                  </p>
                </div>
              </div>

              <div>
                <Label className="text-muted-foreground">Topic/Title</Label>
                <p className="font-medium">{selectedContribution.topic}</p>
              </div>

              {selectedContribution.story && (
                <div>
                  <Label className="text-muted-foreground">Story/Details</Label>
                  <p className="whitespace-pre-wrap bg-muted/50 p-4 rounded-lg mt-1">
                    {selectedContribution.story}
                  </p>
                </div>
              )}

              <div>
                <Label className="text-muted-foreground">Submitted</Label>
                <p className="font-medium">{formatDate(selectedContribution.created_at)}</p>
              </div>

              <hr className="border-border" />

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger id="status" className="min-h-[44px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="reviewed">Reviewed</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="declined">Declined</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-notes">Admin Notes</Label>
                <Textarea
                  id="admin-notes"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add internal notes about this contribution..."
                  rows={3}
                  className="min-h-[88px]"
                />
              </div>

              <div className="flex gap-4 justify-end pt-4">
                <Button
                  variant="outline"
                  onClick={() => setSelectedContribution(null)}
                  className="min-h-[44px]"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdate}
                  disabled={updateMutation.isPending}
                  className="min-h-[44px]"
                >
                  {updateMutation.isPending ? 'Updating...' : 'Update Status'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminContributions;
