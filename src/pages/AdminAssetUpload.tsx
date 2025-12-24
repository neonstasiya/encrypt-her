import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Upload, Copy, Check, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import encryptherLogoText from "@/assets/encrypther-logo-text.png";

const AdminAssetUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const uploadLogo = async () => {
    setUploading(true);
    try {
      // Fetch the local logo file
      const response = await fetch(encryptherLogoText);
      const blob = await response.blob();

      // Upload to Supabase storage
      const fileName = "encrypther-logo-text.png";
      const { data, error } = await supabase.storage
        .from("assets")
        .upload(fileName, blob, {
          contentType: "image/png",
          upsert: true,
        });

      if (error) throw error;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("assets")
        .getPublicUrl(fileName);

      setUploadedUrl(urlData.publicUrl);
      toast.success("Logo uploaded successfully!");
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(error.message || "Failed to upload logo. Make sure you're logged in as an admin.");
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const emailSignatureHtml = uploadedUrl
    ? `<a href="https://encrypther.org" target="_blank" style="text-decoration: none;">
  <img src="${uploadedUrl}" alt="EncryptHer" width="120" style="display: block; border: 0;">
</a>`
    : "";

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <Link to="/" className="text-primary hover:underline text-sm">
          ← Back to Home
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>Upload Logo for Email Signatures</CardTitle>
            <CardDescription>
              Upload the EncryptHer logo to get a public URL for use in email signatures.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Preview */}
            <div className="border rounded-lg p-4 bg-muted/50">
              <p className="text-sm text-muted-foreground mb-3">Logo Preview:</p>
              <img
                src={encryptherLogoText}
                alt="EncryptHer Logo"
                className="h-24 object-contain"
              />
            </div>

            {/* Upload Button */}
            <Button onClick={uploadLogo} disabled={uploading} className="w-full">
              <Upload className="mr-2 h-4 w-4" />
              {uploading ? "Uploading..." : "Upload Logo to Storage"}
            </Button>

            {/* Results */}
            {uploadedUrl && (
              <div className="space-y-4">
                {/* Public URL */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Public URL:</label>
                  <div className="flex gap-2">
                    <Input value={uploadedUrl} readOnly className="font-mono text-xs" />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(uploadedUrl)}
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {/* Test Link */}
                <a
                  href={uploadedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-primary hover:underline"
                >
                  <ExternalLink className="mr-1 h-3 w-3" />
                  Test the URL
                </a>

                {/* Email Signature HTML */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Signature HTML:</label>
                  <div className="relative">
                    <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto font-mono">
                      {emailSignatureHtml}
                    </pre>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(emailSignatureHtml)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Preview */}
                <div className="border rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-3">Email Signature Preview:</p>
                  <a href="https://encrypther.org" target="_blank" rel="noopener noreferrer">
                    <img
                      src={uploadedUrl}
                      alt="EncryptHer"
                      width={120}
                      style={{ display: "block" }}
                    />
                  </a>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAssetUpload;
