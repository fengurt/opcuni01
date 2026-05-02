import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, FolderKanban, Award, Plus, ArrowLeft, Loader2, CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const { t, language } = useLanguage();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form state
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [description, setDescription] = useState("");
  const [certificationLevel, setCertificationLevel] = useState<"L1" | "L2" | "L3">("L1");

  // Queries
  const { data: applications, isLoading: appsLoading, refetch: refetchApps } = trpc.applications.myApplications.useQuery();
  const { data: projects, isLoading: projectsLoading } = trpc.projects.myProjects.useQuery();
  const { data: certificates, isLoading: certsLoading } = trpc.certificates.myCertificates.useQuery();

  // Mutations
  const createApplication = trpc.applications.create.useMutation({
    onSuccess: () => {
      toast.success(t('dashboard.app.success'));
      setIsDialogOpen(false);
      setCompanyName("");
      setIndustry("");
      setDescription("");
      setCertificationLevel("L1");
      refetchApps();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = () => {
    if (!companyName.trim()) {
      toast.error(t('dashboard.app.nameRequired'));
      return;
    }
    createApplication.mutate({
      companyName,
      industry,
      description,
      certificationLevel,
    });
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { icon: typeof Clock; label: string; className: string }> = {
      pending: { icon: Clock, label: t('status.pending'), className: "bg-muted text-muted-foreground" },
      reviewing: { icon: AlertCircle, label: t('status.reviewing'), className: "bg-blue-50 text-blue-700 border-blue-200" },
      approved: { icon: CheckCircle, label: t('status.approved'), className: "bg-green-50 text-green-700 border-green-200" },
      rejected: { icon: XCircle, label: t('status.rejected'), className: "bg-red-50 text-red-700 border-red-200" },
    };
    const config = statusMap[status] || { icon: Clock, label: status, className: "" };
    const Icon = config.icon;
    return (
      <Badge variant="outline" className={`gap-1 ${config.className}`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  const getCertLevelBadge = (level: string) => {
    return <Badge variant="outline" className="font-mono">{level}</Badge>;
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md border">
          <CardHeader className="text-center">
            <CardTitle>{t('dashboard.accessDenied')}</CardTitle>
            <CardDescription>{t('dashboard.pleaseLogin')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/">
              <Button className="w-full">{t('dashboard.returnHome')}</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                {t('dashboard.back')}
              </Button>
            </Link>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-3">
              <img src="/images/opc-logo.png" alt="OPC" className="h-6 w-auto" />
              <div>
                <h1 className="font-semibold">{t('dashboard.title')}</h1>
                <p className="text-xs text-muted-foreground">
                  {t('dashboard.welcome')}, {user.name || user.email || 'Member'}
                </p>
              </div>
            </div>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                {t('dashboard.submit')}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>{t('dashboard.app.title')}</DialogTitle>
                <DialogDescription>{t('dashboard.app.desc')}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">{t('dashboard.app.companyName')} *</Label>
                  <Input
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder={t('dashboard.app.companyPlaceholder')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">{t('dashboard.app.industry')}</Label>
                  <Input
                    id="industry"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder={t('dashboard.app.industryPlaceholder')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certLevel">{t('dashboard.app.certLevel')}</Label>
                  <Select value={certificationLevel} onValueChange={(v) => setCertificationLevel(v as "L1" | "L2" | "L3")}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="L1">L1 - {t('cert.l1.name')}</SelectItem>
                      <SelectItem value="L2">L2 - {t('cert.l2.name')}</SelectItem>
                      <SelectItem value="L3">L3 - {t('cert.l3.name')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">{t('dashboard.app.description')}</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={t('dashboard.app.descPlaceholder')}
                    rows={4}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  {t('cta.cancel')}
                </Button>
                <Button onClick={handleSubmit} disabled={createApplication.isPending}>
                  {createApplication.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {t('cta.submit')}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md bg-muted/50">
            <TabsTrigger value="applications" className="gap-2 data-[state=active]:bg-background">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">{t('dashboard.applications')}</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="gap-2 data-[state=active]:bg-background">
              <FolderKanban className="w-4 h-4" />
              <span className="hidden sm:inline">{t('dashboard.projects')}</span>
            </TabsTrigger>
            <TabsTrigger value="certificates" className="gap-2 data-[state=active]:bg-background">
              <Award className="w-4 h-4" />
              <span className="hidden sm:inline">{t('dashboard.certificates')}</span>
            </TabsTrigger>
          </TabsList>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-4">
            <h2 className="text-lg font-semibold">{t('dashboard.applications')}</h2>
            
            {appsLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : applications && applications.length > 0 ? (
              <div className="grid gap-4">
                {applications.map((app) => (
                  <Card key={app.id} className="border">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-base">{app.companyName}</CardTitle>
                          <CardDescription className="text-sm">
                            {app.industry || t('dashboard.noIndustry')}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          {getCertLevelBadge(app.certificationLevel)}
                          {getStatusBadge(app.status)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {app.description || t('dashboard.noDescription')}
                      </p>
                      <p className="text-xs text-muted-foreground mt-3">
                        {t('dashboard.submitted')}: {new Date(app.createdAt).toLocaleDateString(language === 'zh' ? 'zh-CN' : language === 'ja' ? 'ja-JP' : language === 'fr' ? 'fr-FR' : 'en-US')}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-dashed border-2">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <FileText className="w-10 h-10 text-muted-foreground/60 mb-4" />
                  <h3 className="font-medium mb-2">{t('dashboard.noApps')}</h3>
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    {t('dashboard.noAppsDesc')}
                  </p>
                  <Button size="sm" onClick={() => setIsDialogOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    {t('dashboard.submit')}
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-4">
            <h2 className="text-lg font-semibold">{t('dashboard.projects')}</h2>
            
            {projectsLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : projects && projects.length > 0 ? (
              <div className="grid gap-4">
                {projects.map((project) => (
                  <Card key={project.id} className="border">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-base">{project.title}</CardTitle>
                          <CardDescription className="capitalize">{project.status}</CardDescription>
                        </div>
                        <Badge variant="outline">{project.progress}%</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Progress value={project.progress} className="h-1.5" />
                      
                      {project.milestones && (
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            {t('dashboard.milestones')}
                          </p>
                          <div className="space-y-1">
                            {(project.milestones as Array<{ id: string; title: string; completed: boolean }>).map((milestone) => (
                              <div key={milestone.id} className="flex items-center gap-2 text-sm">
                                {milestone.completed ? (
                                  <CheckCircle className="w-4 h-4 text-primary" />
                                ) : (
                                  <div className="w-4 h-4 rounded-full border border-border" />
                                )}
                                <span className={milestone.completed ? "text-muted-foreground" : ""}>
                                  {milestone.title}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-dashed border-2">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <FolderKanban className="w-10 h-10 text-muted-foreground/60 mb-4" />
                  <h3 className="font-medium mb-2">{t('dashboard.noProjects')}</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    {t('dashboard.noProjectsDesc')}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates" className="space-y-4">
            <h2 className="text-lg font-semibold">{t('dashboard.certificates')}</h2>
            
            {certsLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : certificates && certificates.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {certificates.map((cert) => (
                  <Card key={cert.id} className="border overflow-hidden">
                    <div className="h-1 bg-primary" />
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-base">{cert.title}</CardTitle>
                          <CardDescription>{cert.holderName}</CardDescription>
                        </div>
                        {getCertLevelBadge(cert.level)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t('dashboard.certNumber')}</span>
                          <span className="font-mono text-xs">{cert.certificateNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t('dashboard.issued')}</span>
                          <span>{new Date(cert.issuedAt).toLocaleDateString()}</span>
                        </div>
                        {cert.expiresAt && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">{t('dashboard.expires')}</span>
                            <span>{new Date(cert.expiresAt).toLocaleDateString()}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t('dashboard.status')}</span>
                          <Badge variant="outline" className="capitalize text-xs">
                            {cert.status}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-dashed border-2">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Award className="w-10 h-10 text-muted-foreground/60 mb-4" />
                  <h3 className="font-medium mb-2">{t('dashboard.noCerts')}</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    {t('dashboard.noCertsDesc')}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
