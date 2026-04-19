import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AccessibleHeader } from "@/components/AccessibleHeader";
import { AccessibleFooter } from "@/components/AccessibleFooter";
import { SkipLink } from "@/components/SkipLink";
import { usePageMeta } from "@/hooks/usePageMeta";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Pledge {
  id: string;
  email: string | null;
  agreed_at: string;
  skipped: boolean;
  user_agent: string | null;
}

const AdminPledges = () => {
  usePageMeta("Pledge Signups | Admin | EncryptHer");
  const [pledges, setPledges] = useState<Pledge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPledges();
  }, []);

  const loadPledges = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("site_pledges")
      .select("*")
      .order("agreed_at", { ascending: false })
      .limit(1000);

    if (error) {
      toast.error("Failed to load pledges");
    } else {
      setPledges(data || []);
    }
    setLoading(false);
  };

  const exportCSV = () => {
    const rows = [
      ["Email", "Agreed At", "Skipped", "User Agent"],
      ...pledges.map((p) => [
        p.email || "",
        p.agreed_at,
        p.skipped ? "yes" : "no",
        (p.user_agent || "").replace(/,/g, ";"),
      ]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pledges-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const total = pledges.length;
  const agreed = pledges.filter((p) => !p.skipped).length;
  const withEmail = pledges.filter((p) => !!p.email).length;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SkipLink />
      <AccessibleHeader />
      <main id="main-content" className="flex-grow container mx-auto px-4 py-12" role="main">
        <div className="max-w-5xl mx-auto">
          <Button asChild variant="ghost" size="sm" className="mb-4">
            <Link to="/admin">
              <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
              Back to Admin
            </Link>
          </Button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" aria-hidden="true" />
              Pledge Signups
            </h1>
            <Button onClick={exportCSV} disabled={pledges.length === 0}>
              <Download className="h-4 w-4 mr-2" aria-hidden="true" />
              Export CSV
            </Button>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Total Records</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{total}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Pledges Agreed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">{agreed}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">With Email</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-accent">{withEmail}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Pledges</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-muted-foreground">Loading...</p>
              ) : pledges.length === 0 ? (
                <p className="text-muted-foreground">No pledges recorded yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-border">
                      <tr className="text-left">
                        <th className="py-2 pr-4 font-medium">Email</th>
                        <th className="py-2 pr-4 font-medium">Status</th>
                        <th className="py-2 pr-4 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pledges.map((p) => (
                        <tr key={p.id} className="border-b border-border/50">
                          <td className="py-2 pr-4">{p.email || <span className="text-muted-foreground">—</span>}</td>
                          <td className="py-2 pr-4">
                            {p.skipped ? (
                              <span className="text-muted-foreground">Skipped</span>
                            ) : (
                              <span className="text-primary font-medium">Agreed</span>
                            )}
                          </td>
                          <td className="py-2 pr-4 text-muted-foreground">
                            {new Date(p.agreed_at).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <AccessibleFooter />
    </div>
  );
};

export default AdminPledges;
