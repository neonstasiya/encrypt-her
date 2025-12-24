import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Copy, Check, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import encryptherLogoText from "@/assets/encrypther-logo-text.png";

const LOGO_URL = "https://oxtobnimllpaybkmycpl.supabase.co/storage/v1/object/public/assets/encrypther-logo-text.png";

const AdminAssetUpload = () => {
  const [uploading, setUploading] = useState(true);
  const [uploaded, setUploaded] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);

  const emailSignatureHtml = `<a href="https://encrypther.org" target="_blank" style="text-decoration: none;">
  <img src="${LOGO_URL}" alt="EncryptHer" width="120" style="display: block; border: 0;">
</a>`;

  useEffect(() => {
    const uploadLogo = async () => {
      try {
        // Fetch the local logo file
        const response = await fetch(encryptherLogoText);
        const blob = await response.blob();

        // Upload to Supabase storage
        const { error } = await supabase.storage
          .from("assets")
          .upload("encrypther-logo-text.png", blob, {
            contentType: "image/png",
            upsert: true,
          });

        if (error && !error.message.includes("already exists")) {
          throw error;
        }

        setUploaded(true);
        toast.success("Logo ready for email signatures!");
      } catch (error: any) {
        console.error("Upload error:", error);
        // Still show as uploaded if it already exists
        setUploaded(true);
      } finally {
        setUploading(false);
      }
    };

    uploadLogo();
  }, []);

  const copyToClipboard = async (text: string, type: "url" | "html") => {
    await navigator.clipboard.writeText(text);
    if (type === "url") {
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } else {
      setCopiedHtml(true);
      setTimeout(() => setCopiedHtml(false), 2000);
    }
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <Link to="/" className="text-primary hover:underline text-sm">
          ← Back to Home
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>Email Signature</CardTitle>
            <CardDescription>
              Copy the HTML below and paste it into your email signature settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {uploading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2 text-muted-foreground">Preparing logo...</span>
              </div>
            ) : (
              <>
                {/* Live Preview */}
                <div className="border rounded-lg p-6 bg-muted/30">
                  <p className="text-sm text-muted-foreground mb-4">Preview:</p>
                  <a href="https://encrypther.org" target="_blank" rel="noopener noreferrer">
                    <img
                      src={LOGO_URL}
                      alt="EncryptHer"
                      width={120}
                      style={{ display: "block" }}
                    />
                  </a>
                </div>

                {/* Copy HTML Button - Primary Action */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Signature HTML:</label>
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto font-mono whitespace-pre-wrap">
                      {emailSignatureHtml}
                    </pre>
                  </div>
                  <Button
                    onClick={() => copyToClipboard(emailSignatureHtml, "html")}
                    className="w-full"
                    size="lg"
                  >
                    {copiedHtml ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Email Signature HTML
                      </>
                    )}
                  </Button>
                </div>

                {/* Public URL */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Logo URL (for reference):</label>
                  <div className="flex gap-2">
                    <Input value={LOGO_URL} readOnly className="font-mono text-xs" />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(LOGO_URL, "url")}
                    >
                      {copiedUrl ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {/* Instructions */}
                <div className="border-t pt-4 space-y-3">
                  <h3 className="font-medium">How to add to your email:</h3>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p><strong>Gmail:</strong> Settings → See all settings → Signature → Click the image icon → Paste the logo URL</p>
                    <p><strong>Outlook:</strong> File → Options → Mail → Signatures → New → Paste HTML in source mode</p>
                    <p><strong>Apple Mail:</strong> Mail → Preferences → Signatures → Create new → Paste HTML</p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAssetUpload;
