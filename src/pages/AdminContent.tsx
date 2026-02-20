import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Save, RotateCcw, Eye, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AccessibleHeader } from "@/components/AccessibleHeader";
import { AccessibleFooter } from "@/components/AccessibleFooter";
import { SkipLink } from "@/components/SkipLink";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useAllPageContent, useUpdatePageContent, PageContent } from "@/hooks/usePageContent";
import { toast } from "sonner";

interface PageConfig {
  key: string;
  label: string;
  previewPath: string;
  sections: {
    key: string;
    label: string;
    fields: {
      key: string;
      label: string;
      type: "input" | "textarea";
      placeholder?: string;
    }[];
  }[];
}

const pageConfigs: PageConfig[] = [
  {
    key: "index",
    label: "Home Page",
    previewPath: "/",
    sections: [
      {
        key: "hero",
        label: "Hero Section",
        fields: [
          { key: "badge", label: "Badge Text", type: "input", placeholder: "Empowering Women Through Digital Safety" },
          { key: "title", label: "Main Title", type: "input", placeholder: "Your Safety, Your Privacy, Your Power" },
          { key: "description", label: "Description", type: "textarea", placeholder: "EncryptHer provides essential education..." },
          { key: "buttonText", label: "Button Text", type: "input", placeholder: "Get Empowered" },
        ],
      },
      {
        key: "whatWeDo",
        label: "What We Do Section",
        fields: [
          { key: "title", label: "Section Title", type: "input", placeholder: "What We Do" },
          { key: "description", label: "Section Description", type: "textarea", placeholder: "EncryptHer empowers women..." },
          { key: "educationTitle", label: "Education Card Title", type: "input", placeholder: "Educational Courses" },
          { key: "educationDescription", label: "Education Card Description", type: "textarea" },
          { key: "advocacyTitle", label: "Advocacy Card Title", type: "input", placeholder: "Advocacy Work" },
          { key: "advocacyDescription", label: "Advocacy Card Description", type: "textarea" },
        ],
      },
      {
        key: "courses",
        label: "Courses Section",
        fields: [
          { key: "title", label: "Section Title", type: "input", placeholder: "Learn It" },
          { key: "description", label: "Section Description", type: "textarea" },
        ],
      },
      {
        key: "cta",
        label: "Call to Action Section",
        fields: [
          { key: "title", label: "CTA Title", type: "input", placeholder: "Ready to Take Control?" },
          { key: "description", label: "CTA Description", type: "textarea" },
          { key: "primaryButton", label: "Primary Button Text", type: "input", placeholder: "Enroll Now" },
          { key: "secondaryButton", label: "Secondary Button Text", type: "input", placeholder: "Free Resources" },
        ],
      },
    ],
  },
  {
    key: "about",
    label: "About Page",
    previewPath: "/about",
    sections: [
      {
        key: "header",
        label: "Page Header",
        fields: [
          { key: "title", label: "Page Title", type: "input", placeholder: "About EncryptHer" },
          { key: "tagline", label: "Tagline", type: "input", placeholder: "Born from personal experience..." },
        ],
      },
      {
        key: "mission",
        label: "Mission Section",
        fields: [
          { key: "title", label: "Section Title", type: "input", placeholder: "Our Mission" },
          { key: "paragraph1", label: "Paragraph 1", type: "textarea" },
          { key: "paragraph2", label: "Paragraph 2", type: "textarea" },
          { key: "paragraph3", label: "Paragraph 3", type: "textarea" },
          { key: "paragraph4", label: "Paragraph 4", type: "textarea" },
          { key: "paragraph5", label: "Paragraph 5", type: "textarea" },
          { key: "paragraph6", label: "Paragraph 6", type: "textarea" },
        ],
      },
      {
        key: "values",
        label: "Core Values",
        fields: [
          { key: "title", label: "Section Title", type: "input", placeholder: "Our Core Values" },
          { key: "advocacy", label: "Advocacy Description", type: "textarea" },
          { key: "awareness", label: "Awareness Description", type: "textarea" },
          { key: "education", label: "Education Description", type: "textarea" },
        ],
      },
    ],
  },
];

const AdminContent = () => {
  usePageMeta("Edit Page Content | EncryptHer");
  const { data: allContent, isLoading } = useAllPageContent();
  const updateContent = useUpdatePageContent();
  
  const [selectedPage, setSelectedPage] = useState(pageConfigs[0].key);
  const [editedContent, setEditedContent] = useState<Record<string, PageContent>>({});
  const [hasChanges, setHasChanges] = useState(false);

  // Initialize edited content when data loads
  useEffect(() => {
    if (allContent) {
      setEditedContent(allContent);
    }
  }, [allContent]);

  const currentPageConfig = pageConfigs.find(p => p.key === selectedPage)!;

  const getFieldValue = (sectionKey: string, fieldKey: string): string => {
    const pageContent = editedContent[selectedPage] || {};
    const section = pageContent[sectionKey] as PageContent | undefined;
    return (section?.[fieldKey] as string) || "";
  };

  const setFieldValue = (sectionKey: string, fieldKey: string, value: string) => {
    setEditedContent(prev => {
      const pageContent = { ...(prev[selectedPage] || {}) };
      const section = { ...((pageContent[sectionKey] as PageContent) || {}) };
      section[fieldKey] = value;
      pageContent[sectionKey] = section;
      return { ...prev, [selectedPage]: pageContent };
    });
    setHasChanges(true);
  };

  const handleSave = async () => {
    try {
      await updateContent.mutateAsync({
        pageKey: selectedPage,
        content: editedContent[selectedPage] || {},
      });
      toast.success("Content saved successfully!");
      setHasChanges(false);
    } catch (error) {
      console.error("Error saving content:", error);
      toast.error("Failed to save content. Please try again.");
    }
  };

  const handleReset = () => {
    if (allContent) {
      setEditedContent(prev => ({
        ...prev,
        [selectedPage]: allContent[selectedPage] || {},
      }));
      setHasChanges(false);
      toast.info("Changes discarded");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <SkipLink />
        <AccessibleHeader />
        <main id="main-content" className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <AccessibleFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SkipLink />
      <AccessibleHeader />

      <main id="main-content" className="flex-grow container mx-auto px-4 py-12" role="main">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild className="min-h-[44px]">
                <Link to="/admin">
                  <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
                  Dashboard
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <FileText className="h-6 w-6 text-primary" aria-hidden="true" />
                  Edit Page Content
                </h1>
                <p className="text-sm text-muted-foreground">
                  Update text content on website pages
                </p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleReset}
                disabled={!hasChanges}
                className="min-h-[44px]"
              >
                <RotateCcw className="h-4 w-4 mr-2" aria-hidden="true" />
                Discard
              </Button>
              <Button
                onClick={handleSave}
                disabled={!hasChanges || updateContent.isPending}
                className="min-h-[44px]"
              >
                {updateContent.isPending ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" aria-hidden="true" />
                ) : (
                  <Save className="h-4 w-4 mr-2" aria-hidden="true" />
                )}
                Save Changes
              </Button>
            </div>
          </div>

          {/* Page Selector */}
          <Tabs value={selectedPage} onValueChange={(v) => setSelectedPage(v)} className="mb-6">
            <TabsList className="w-full justify-start">
              {pageConfigs.map(page => (
                <TabsTrigger key={page.key} value={page.key} className="min-h-[44px]">
                  {page.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {pageConfigs.map(page => (
              <TabsContent key={page.key} value={page.key}>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{page.label}</CardTitle>
                        <CardDescription>
                          Edit the content sections for this page
                        </CardDescription>
                      </div>
                      <Button variant="outline" size="sm" asChild className="min-h-[44px]">
                        <a href={page.previewPath} target="_blank" rel="noopener noreferrer">
                          <Eye className="h-4 w-4 mr-2" aria-hidden="true" />
                          Preview
                        </a>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="multiple" className="w-full" defaultValue={page.sections.map(s => s.key)}>
                      {page.sections.map(section => (
                        <AccordionItem key={section.key} value={section.key}>
                          <AccordionTrigger className="text-left min-h-[44px]">
                            {section.label}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4 pt-4">
                              {section.fields.map(field => (
                                <div key={field.key} className="space-y-2">
                                  <Label htmlFor={`${section.key}-${field.key}`}>
                                    {field.label}
                                  </Label>
                                  {field.type === "input" ? (
                                    <Input
                                      id={`${section.key}-${field.key}`}
                                      value={getFieldValue(section.key, field.key)}
                                      onChange={(e) => setFieldValue(section.key, field.key, e.target.value)}
                                      placeholder={field.placeholder}
                                      className="min-h-[44px]"
                                    />
                                  ) : (
                                    <Textarea
                                      id={`${section.key}-${field.key}`}
                                      value={getFieldValue(section.key, field.key)}
                                      onChange={(e) => setFieldValue(section.key, field.key, e.target.value)}
                                      placeholder={field.placeholder}
                                      rows={4}
                                      className="min-h-[88px]"
                                    />
                                  )}
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>

          {/* Info Box */}
          <Card className="bg-muted/30 border-muted">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> Changes will appear on the website after saving. 
                If a field is left empty, the default text will be used. 
                Refresh the page after saving to see changes in the preview.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <AccessibleFooter />
    </div>
  );
};

export default AdminContent;
