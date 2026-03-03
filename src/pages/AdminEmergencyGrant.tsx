import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AccessibleHeader } from "@/components/AccessibleHeader";
import { AccessibleFooter } from "@/components/AccessibleFooter";
import { SkipLink } from "@/components/SkipLink";
import { usePageMeta } from "@/hooks/usePageMeta";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Upload, Trash2, GripVertical, Image, Video, Save } from "lucide-react";
import { Link } from "react-router-dom";

interface MediaItem {
  id: string;
  file_url: string;
  media_type: string;
  caption: string | null;
  display_order: number;
  created_at: string;
}

const AdminEmergencyGrant = () => {
  usePageMeta("Admin: Emergency Grant Media | EncryptHer");
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);
  const [editingCaption, setEditingCaption] = useState<Record<string, string>>({});

  const { data: media = [], isLoading } = useQuery({
    queryKey: ["emergency-grant-media"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("emergency_grant_media")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data as MediaItem[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (item: MediaItem) => {
      // Extract file path from URL
      const url = new URL(item.file_url);
      const pathParts = url.pathname.split("/storage/v1/object/public/emergency-grant/");
      if (pathParts[1]) {
        await supabase.storage.from("emergency-grant").remove([pathParts[1]]);
      }
      const { error } = await supabase.from("emergency_grant_media").delete().eq("id", item.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["emergency-grant-media"] });
      toast.success("Media deleted");
    },
    onError: () => toast.error("Failed to delete media"),
  });

  const updateCaptionMutation = useMutation({
    mutationFn: async ({ id, caption }: { id: string; caption: string }) => {
      const { error } = await supabase
        .from("emergency_grant_media")
        .update({ caption })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["emergency-grant-media"] });
      toast.success("Caption saved");
    },
    onError: () => toast.error("Failed to save caption"),
  });

  const reorderMutation = useMutation({
    mutationFn: async (items: { id: string; display_order: number }[]) => {
      for (const item of items) {
        const { error } = await supabase
          .from("emergency_grant_media")
          .update({ display_order: item.display_order })
          .eq("id", item.id);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["emergency-grant-media"] });
    },
    onError: () => toast.error("Failed to reorder"),
  });

  const handleUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const isVideo = file.type.startsWith("video/");
        const ext = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from("emergency-grant")
          .upload(fileName, file);
        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("emergency-grant")
          .getPublicUrl(fileName);

        const maxOrder = media.length > 0 ? Math.max(...media.map((m) => m.display_order)) + 1 : 0;

        const { error: insertError } = await supabase.from("emergency_grant_media").insert({
          file_url: urlData.publicUrl,
          media_type: isVideo ? "video" : "photo",
          display_order: maxOrder,
        });
        if (insertError) throw insertError;
      }
      toast.success("Upload complete");
      queryClient.invalidateQueries({ queryKey: ["emergency-grant-media"] });
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }, [media, queryClient]);

  const moveItem = (index: number, direction: -1 | 1) => {
    const swapIndex = index + direction;
    if (swapIndex < 0 || swapIndex >= media.length) return;
    const updates = [
      { id: media[index].id, display_order: media[swapIndex].display_order },
      { id: media[swapIndex].id, display_order: media[index].display_order },
    ];
    reorderMutation.mutate(updates);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SkipLink />
      <AccessibleHeader />

      <main id="main-content" className="flex-grow container mx-auto px-4 py-12" role="main">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="sm" asChild className="min-h-[44px]">
              <Link to="/admin">
                <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
                Dashboard
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-foreground">Emergency Grant Media</h1>
          </div>

          {/* Upload */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg">Upload Photos & Videos</CardTitle>
            </CardHeader>
            <CardContent>
              <label className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-border rounded-lg p-8 cursor-pointer hover:border-primary/50 transition-colors">
                <Upload className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
                <span className="text-sm text-muted-foreground">
                  {uploading ? "Uploading…" : "Click or drag files here (images & video)"}
                </span>
                <input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  className="sr-only"
                  onChange={handleUpload}
                  disabled={uploading}
                />
              </label>
            </CardContent>
          </Card>

          {/* Media list */}
          {isLoading ? (
            <p className="text-muted-foreground text-center py-8">Loading media…</p>
          ) : media.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No media uploaded yet.</p>
          ) : (
            <div className="space-y-4">
              {media.map((item, index) => (
                <Card key={item.id} className="border-border">
                  <CardContent className="p-4 flex gap-4 items-start">
                    {/* Reorder */}
                    <div className="flex flex-col gap-1 pt-2">
                      <button
                        onClick={() => moveItem(index, -1)}
                        disabled={index === 0}
                        className="text-muted-foreground hover:text-foreground disabled:opacity-30 p-1"
                        aria-label="Move up"
                      >
                        ▲
                      </button>
                      <GripVertical className="h-4 w-4 text-muted-foreground mx-auto" aria-hidden="true" />
                      <button
                        onClick={() => moveItem(index, 1)}
                        disabled={index === media.length - 1}
                        className="text-muted-foreground hover:text-foreground disabled:opacity-30 p-1"
                        aria-label="Move down"
                      >
                        ▼
                      </button>
                    </div>

                    {/* Preview */}
                    <div className="w-32 h-24 rounded-lg overflow-hidden bg-muted shrink-0">
                      {item.media_type === "video" ? (
                        <video src={item.file_url} className="w-full h-full object-cover" muted />
                      ) : (
                        <img src={item.file_url} alt={item.caption || "Grant media"} className="w-full h-full object-cover" />
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {item.media_type === "video" ? (
                          <Video className="h-3 w-3" aria-hidden="true" />
                        ) : (
                          <Image className="h-3 w-3" aria-hidden="true" />
                        )}
                        {item.media_type}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a caption…"
                          value={editingCaption[item.id] ?? item.caption ?? ""}
                          onChange={(e) =>
                            setEditingCaption((prev) => ({ ...prev, [item.id]: e.target.value }))
                          }
                          className="text-sm"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          className="min-h-[44px]"
                          onClick={() =>
                            updateCaptionMutation.mutate({
                              id: item.id,
                              caption: editingCaption[item.id] ?? item.caption ?? "",
                            })
                          }
                        >
                          <Save className="h-4 w-4" aria-hidden="true" />
                        </Button>
                      </div>
                    </div>

                    {/* Delete */}
                    <Button
                      size="sm"
                      variant="destructive"
                      className="min-h-[44px]"
                      onClick={() => deleteMutation.mutate(item)}
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <AccessibleFooter />
    </div>
  );
};

export default AdminEmergencyGrant;
