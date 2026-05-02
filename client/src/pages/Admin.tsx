import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileText, 
  Languages, 
  Users, 
  ArrowLeft, 
  Loader2, 
  CheckCircle, 
  Clock, 
  XCircle, 
  AlertCircle,
  Plus,
  Pencil,
  Trash2,
  Shield,
  UserCheck,
  Eye,
  EyeOff,
  Download,
  ArrowDownAZ,
  ArrowUp,
  ArrowDown,
  GripVertical,
  RefreshCw,
  CloudDownload
} from "lucide-react";
import { useState, useCallback } from "react";
import { Link } from "wouter";
import { toast } from "sonner";

export default function Admin() {
  const { user, loading: authLoading } = useAuth();
  const { t } = useLanguage();

  // Application management state
  const [selectedApp, setSelectedApp] = useState<number | null>(null);
  const [newStatus, setNewStatus] = useState<"pending" | "reviewing" | "approved" | "rejected">("pending");
  const [adminNotes, setAdminNotes] = useState("");

  // Translation management state
  const [isTranslationDialogOpen, setIsTranslationDialogOpen] = useState(false);
  const [editingTranslation, setEditingTranslation] = useState<{
    key: string;
    category?: string;
    en?: string;
    zh?: string;
    fr?: string;
    ja?: string;
  } | null>(null);
  const [translationForm, setTranslationForm] = useState({
    key: "",
    category: "",
    en: "",
    zh: "",
    fr: "",
    ja: "",
  });

  // Partner management state
  const [isPartnerDialogOpen, setIsPartnerDialogOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<number | null>(null);
  const [partnerJsonInput, setPartnerJsonInput] = useState("");

  // Remote sync state
  const [expertsSyncing, setExpertsSyncing] = useState(false);
  const [partnersSyncing, setPartnersSyncing] = useState(false);
  const [expertsLastSync, setExpertsLastSync] = useState<string | null>(localStorage.getItem('admin_experts_last_sync'));
  const [partnersLastSync, setPartnersLastSync] = useState<string | null>(localStorage.getItem('admin_partners_last_sync'));

  // Queries
  const { data: applications, isLoading: appsLoading, refetch: refetchApps } = trpc.applications.list.useQuery();
  const { data: translations, isLoading: translationsLoading, refetch: refetchTranslations } = trpc.translations.list.useQuery();
  const { data: users, isLoading: usersLoading } = trpc.users.list.useQuery();
  const { data: experts, isLoading: expertsLoading, refetch: refetchExperts } = trpc.experts.list.useQuery();
  const { data: partners, isLoading: partnersLoading, refetch: refetchPartners } = trpc.partners.list.useQuery();
  const { data: partnerApps, isLoading: partnerAppsLoading, refetch: refetchPartnerApps } = trpc.partnerApplications.list.useQuery();

  // Expert order mutation
  const updateExpertOrder = trpc.experts.batchReorder.useMutation({
    onSuccess: () => {
      toast.success("排序已更新");
      refetchExperts();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Partner order mutation
  const updatePartnerOrder = trpc.partners.batchReorder.useMutation({
    onSuccess: () => {
      toast.success("排序已更新");
      refetchPartners();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Expert visibility mutation
  const toggleExpertVisibility = trpc.experts.toggleVisibility.useMutation({
    onSuccess: () => {
      toast.success(t('cta.save'));
      refetchExperts();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Mutations
  const updateStatus = trpc.applications.updateStatus.useMutation({
    onSuccess: () => {
      toast.success(t('dashboard.app.success'));
      setSelectedApp(null);
      setAdminNotes("");
      refetchApps();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const upsertTranslation = trpc.translations.upsert.useMutation({
    onSuccess: () => {
      toast.success(editingTranslation ? t('cta.save') : t('cta.save'));
      setIsTranslationDialogOpen(false);
      setEditingTranslation(null);
      setTranslationForm({ key: "", category: "", en: "", zh: "", fr: "", ja: "" });
      refetchTranslations();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteTranslation = trpc.translations.delete.useMutation({
    onSuccess: () => {
      toast.success(t('cta.delete'));
      refetchTranslations();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Partner mutations
  const togglePartnerVisibility = trpc.partners.toggleVisibility.useMutation({
    onSuccess: () => {
      toast.success(t('cta.save'));
      refetchPartners();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const bulkUpdatePartner = trpc.partners.bulkUpdateJson.useMutation({
    onSuccess: () => {
      toast.success(t('cta.save'));
      setIsPartnerDialogOpen(false);
      setEditingPartner(null);
      setPartnerJsonInput("");
      refetchPartners();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const updatePartnerAppStatus = trpc.partnerApplications.updateStatus.useMutation({
    onSuccess: () => {
      toast.success(t('cta.save'));
      refetchPartnerApps();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Helper: move expert up or down in order
  const moveExpert = (expertId: number, direction: 'up' | 'down') => {
    if (!experts) return;
    const sorted = [...experts].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
    const idx = sorted.findIndex(e => e.id === expertId);
    if (idx < 0) return;
    if (direction === 'up' && idx === 0) return;
    if (direction === 'down' && idx === sorted.length - 1) return;
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    const items = sorted.map((e, i) => {
      if (i === idx) return { id: e.id, displayOrder: swapIdx };
      if (i === swapIdx) return { id: e.id, displayOrder: idx };
      return { id: e.id, displayOrder: i };
    });
    updateExpertOrder.mutate({ items });
  };

  // Helper: move partner up or down in order
  const movePartner = (partnerId: number, direction: 'up' | 'down') => {
    if (!partners) return;
    const sorted = [...partners].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
    const idx = sorted.findIndex(p => p.id === partnerId);
    if (idx < 0) return;
    if (direction === 'up' && idx === 0) return;
    if (direction === 'down' && idx === sorted.length - 1) return;
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    const items = sorted.map((p, i) => {
      if (i === idx) return { id: p.id, displayOrder: swapIdx };
      if (i === swapIdx) return { id: p.id, displayOrder: idx };
      return { id: p.id, displayOrder: i };
    });
    updatePartnerOrder.mutate({ items });
  };

  // Remote API sync handlers
  const handleSyncExperts = useCallback(async () => {
    setExpertsSyncing(true);
    try {
      // Simulate remote API call - in production, replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      const now = new Date().toISOString();
      localStorage.setItem('admin_experts_last_sync', now);
      setExpertsLastSync(now);
      refetchExperts();
      toast.success('讲师数据同步完成');
    } catch (err) {
      toast.error('同步失败，请稍后重试');
    } finally {
      setExpertsSyncing(false);
    }
  }, [refetchExperts]);

  const handleSyncPartners = useCallback(async () => {
    setPartnersSyncing(true);
    try {
      // Simulate remote API call - in production, replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      const now = new Date().toISOString();
      localStorage.setItem('admin_partners_last_sync', now);
      setPartnersLastSync(now);
      refetchPartners();
      toast.success('合作伙伴数据同步完成');
    } catch (err) {
      toast.error('同步失败，请稍后重试');
    } finally {
      setPartnersSyncing(false);
    }
  }, [refetchPartners]);

  const formatSyncTime = (isoString: string | null) => {
    if (!isoString) return '从未同步';
    const d = new Date(isoString);
    return d.toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
  };

  const handleUpdateStatus = () => {
    if (selectedApp === null) return;
    updateStatus.mutate({
      id: selectedApp,
      status: newStatus,
      adminNotes: adminNotes || undefined,
    });
  };

  const handleSaveTranslation = () => {
    if (!translationForm.key.trim()) {
      toast.error(t('dashboard.app.nameRequired'));
      return;
    }
    upsertTranslation.mutate(translationForm);
  };

  const openEditTranslation = (trans: typeof editingTranslation) => {
    if (!trans) return;
    setEditingTranslation(trans);
    setTranslationForm({
      key: trans.key,
      category: trans.category || "",
      en: trans.en || "",
      zh: trans.zh || "",
      fr: trans.fr || "",
      ja: trans.ja || "",
    });
    setIsTranslationDialogOpen(true);
  };

  const openNewTranslation = () => {
    setEditingTranslation(null);
    setTranslationForm({ key: "", category: "", en: "", zh: "", fr: "", ja: "" });
    setIsTranslationDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="gap-1 font-normal"><Clock className="w-3 h-3" /> {t('status.pending')}</Badge>;
      case "reviewing":
        return <Badge variant="outline" className="gap-1 font-normal border-[#009edb] text-[#009edb]"><AlertCircle className="w-3 h-3" /> {t('status.reviewing')}</Badge>;
      case "approved":
        return <Badge variant="default" className="gap-1 font-normal bg-[#4d9f0c]"><CheckCircle className="w-3 h-3" /> {t('status.approved')}</Badge>;
      case "rejected":
        return <Badge variant="destructive" className="gap-1 font-normal"><XCircle className="w-3 h-3" /> {t('status.rejected')}</Badge>;
      default:
        return <Badge variant="secondary" className="font-normal">{status}</Badge>;
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-6 h-6 animate-spin text-[#009edb]" />
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <Card className="w-full max-w-md border-0 shadow-sm">
          <CardHeader className="text-center">
            <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-neutral-500" />
            </div>
            <CardTitle className="text-lg font-medium">{t('admin.accessDenied')}</CardTitle>
            <CardDescription>{t('admin.adminOnly')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/">
              <Button className="w-full bg-[#009edb] hover:bg-[#0080b3]">{t('dashboard.returnHome')}</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header - UN Style */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2 text-neutral-600 hover:text-neutral-900">
                  <ArrowLeft className="w-4 h-4" />
                  {t('dashboard.back')}
                </Button>
              </Link>
              <div className="h-6 w-px bg-neutral-200" />
              <div className="flex items-center gap-3">
                <img src="/images/opc-logo.png" alt="OPC" className="h-8 w-auto" />
                <div>
                  <h1 className="font-medium text-neutral-900">{t('admin.title')}</h1>
                  <p className="text-xs text-neutral-500">{t('admin.applications')}, {t('admin.translations')}, {t('admin.users')}</p>
                </div>
              </div>
            </div>
            <Badge variant="outline" className="border-[#009edb] text-[#009edb]">Admin</Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="applications" className="space-y-8">
          <TabsList className="bg-white border border-neutral-200 p-1 h-auto">
            <TabsTrigger value="applications" className="gap-2 data-[state=active]:bg-[#009edb] data-[state=active]:text-white px-4 py-2">
              <FileText className="w-4 h-4" />
              {t('admin.applications')}
            </TabsTrigger>
            <TabsTrigger value="translations" className="gap-2 data-[state=active]:bg-[#009edb] data-[state=active]:text-white px-4 py-2">
              <Languages className="w-4 h-4" />
              {t('admin.translations')}
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-2 data-[state=active]:bg-[#009edb] data-[state=active]:text-white px-4 py-2">
              <Users className="w-4 h-4" />
              {t('admin.users')}
            </TabsTrigger>
            <TabsTrigger value="experts" className="gap-2 data-[state=active]:bg-[#009edb] data-[state=active]:text-white px-4 py-2">
              <UserCheck className="w-4 h-4" />
              {t('admin.experts')}
            </TabsTrigger>
            <TabsTrigger value="partners" className="gap-2 data-[state=active]:bg-[#009edb] data-[state=active]:text-white px-4 py-2">
              <Users className="w-4 h-4" />
              {t('admin.partners')}
            </TabsTrigger>
            <TabsTrigger value="partnerApps" className="gap-2 data-[state=active]:bg-[#009edb] data-[state=active]:text-white px-4 py-2">
              <FileText className="w-4 h-4" />
              {t('admin.partnerApplications')}
            </TabsTrigger>
            <Link href="/export">
              <Button variant="outline" size="sm" className="gap-2 ml-2 border-accent/30 text-accent hover:bg-accent/5 h-9">
                <Download className="w-4 h-4" />
                导出中心
              </Button>
            </Link>
          </TabsList>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium text-neutral-900">{t('admin.applications')}</h2>
              <span className="text-sm text-neutral-500">{applications?.length || 0} total</span>
            </div>
            
            {appsLoading ? (
              <div className="flex justify-center py-16">
                <Loader2 className="w-6 h-6 animate-spin text-[#009edb]" />
              </div>
            ) : applications && applications.length > 0 ? (
              <Card className="border-0 shadow-sm overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-neutral-50 hover:bg-neutral-50">
                      <TableHead className="font-medium text-neutral-600">Company</TableHead>
                      <TableHead className="font-medium text-neutral-600">Industry</TableHead>
                      <TableHead className="font-medium text-neutral-600">Level</TableHead>
                      <TableHead className="font-medium text-neutral-600">{t('dashboard.status')}</TableHead>
                      <TableHead className="font-medium text-neutral-600">Date</TableHead>
                      <TableHead className="font-medium text-neutral-600">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applications.map((app) => (
                      <TableRow key={app.id} className="hover:bg-neutral-50">
                        <TableCell className="font-medium text-neutral-900">{app.companyName}</TableCell>
                        <TableCell className="text-neutral-600">{app.industry || "-"}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-normal">{app.certificationLevel}</Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(app.status)}</TableCell>
                        <TableCell className="text-neutral-500">
                          {new Date(app.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="border-neutral-200 hover:border-[#009edb] hover:text-[#009edb]"
                                onClick={() => {
                                  setSelectedApp(app.id);
                                  setNewStatus(app.status as typeof newStatus);
                                  setAdminNotes(app.adminNotes || "");
                                }}
                              >
                                {t('cta.edit')}
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="border-0 shadow-lg">
                              <DialogHeader>
                                <DialogTitle className="font-medium">{t('admin.updateStatus')}</DialogTitle>
                                <DialogDescription className="text-neutral-500">
                                  {app.companyName}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <Label className="text-neutral-600">{t('dashboard.app.description')}</Label>
                                  <p className="text-sm bg-neutral-50 p-3 rounded-md text-neutral-700">
                                    {app.description || t('dashboard.noDescription')}
                                  </p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-neutral-600">{t('dashboard.status')}</Label>
                                  <Select value={newStatus} onValueChange={(v) => setNewStatus(v as typeof newStatus)}>
                                    <SelectTrigger className="border-neutral-200">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="pending">{t('status.pending')}</SelectItem>
                                      <SelectItem value="reviewing">{t('status.reviewing')}</SelectItem>
                                      <SelectItem value="approved">{t('status.approved')}</SelectItem>
                                      <SelectItem value="rejected">{t('status.rejected')}</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-neutral-600">Admin Notes</Label>
                                  <Textarea
                                    value={adminNotes}
                                    onChange={(e) => setAdminNotes(e.target.value)}
                                    placeholder="Internal notes..."
                                    rows={3}
                                    className="border-neutral-200"
                                  />
                                </div>
                              </div>
                              <div className="flex justify-end gap-3">
                                <Button 
                                  onClick={handleUpdateStatus}
                                  disabled={updateStatus.isPending}
                                  className="bg-[#009edb] hover:bg-[#0080b3]"
                                >
                                  {updateStatus.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                  {t('cta.save')}
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            ) : (
              <Card className="border border-dashed border-neutral-300 bg-white">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-neutral-400" />
                  </div>
                  <h3 className="font-medium text-neutral-900 mb-1">{t('admin.noApps')}</h3>
                  <p className="text-sm text-neutral-500">{t('dashboard.noAppsDesc')}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Translations Tab */}
          <TabsContent value="translations" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium text-neutral-900">{t('admin.translations')}</h2>
              <Button onClick={openNewTranslation} className="gap-2 bg-[#009edb] hover:bg-[#0080b3]">
                <Plus className="w-4 h-4" />
                Add
              </Button>
            </div>
            
            <Dialog open={isTranslationDialogOpen} onOpenChange={setIsTranslationDialogOpen}>
              <DialogContent className="sm:max-w-[600px] border-0 shadow-lg">
                <DialogHeader>
                  <DialogTitle className="font-medium">
                    {editingTranslation ? t('cta.edit') : "Add"} Translation
                  </DialogTitle>
                  <DialogDescription className="text-neutral-500">
                    {t('admin.translations')}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-neutral-600">Key *</Label>
                      <Input
                        value={translationForm.key}
                        onChange={(e) => setTranslationForm({ ...translationForm, key: e.target.value })}
                        placeholder="e.g., hero.title"
                        disabled={!!editingTranslation}
                        className="border-neutral-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-neutral-600">Category</Label>
                      <Input
                        value={translationForm.category}
                        onChange={(e) => setTranslationForm({ ...translationForm, category: e.target.value })}
                        placeholder="e.g., hero, nav"
                        className="border-neutral-200"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-neutral-600">{t('admin.english')} (EN)</Label>
                    <Textarea
                      value={translationForm.en}
                      onChange={(e) => setTranslationForm({ ...translationForm, en: e.target.value })}
                      rows={2}
                      className="border-neutral-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-neutral-600">{t('admin.chinese')} (ZH)</Label>
                    <Textarea
                      value={translationForm.zh}
                      onChange={(e) => setTranslationForm({ ...translationForm, zh: e.target.value })}
                      rows={2}
                      className="border-neutral-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-neutral-600">{t('admin.french')} (FR)</Label>
                    <Textarea
                      value={translationForm.fr}
                      onChange={(e) => setTranslationForm({ ...translationForm, fr: e.target.value })}
                      rows={2}
                      className="border-neutral-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-neutral-600">{t('admin.japanese')} (JA)</Label>
                    <Textarea
                      value={translationForm.ja}
                      onChange={(e) => setTranslationForm({ ...translationForm, ja: e.target.value })}
                      rows={2}
                      className="border-neutral-200"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsTranslationDialogOpen(false)} className="border-neutral-200">
                    {t('cta.cancel')}
                  </Button>
                  <Button onClick={handleSaveTranslation} disabled={upsertTranslation.isPending} className="bg-[#009edb] hover:bg-[#0080b3]">
                    {upsertTranslation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {t('cta.save')}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {translationsLoading ? (
              <div className="flex justify-center py-16">
                <Loader2 className="w-6 h-6 animate-spin text-[#009edb]" />
              </div>
            ) : translations && translations.length > 0 ? (
              <Card className="border-0 shadow-sm overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-neutral-50 hover:bg-neutral-50">
                      <TableHead className="font-medium text-neutral-600">{t('admin.translationKey')}</TableHead>
                      <TableHead className="font-medium text-neutral-600">Category</TableHead>
                      <TableHead className="font-medium text-neutral-600">EN</TableHead>
                      <TableHead className="font-medium text-neutral-600">ZH</TableHead>
                      <TableHead className="font-medium text-neutral-600">FR</TableHead>
                      <TableHead className="font-medium text-neutral-600">JA</TableHead>
                      <TableHead className="font-medium text-neutral-600">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {translations.map((trans) => (
                      <TableRow key={trans.id} className="hover:bg-neutral-50">
                        <TableCell className="font-mono text-sm text-neutral-700">{trans.key}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-normal">{trans.category || "-"}</Badge>
                        </TableCell>
                        <TableCell className="max-w-[100px] truncate text-neutral-600" title={trans.en || ""}>
                          {trans.en || "-"}
                        </TableCell>
                        <TableCell className="max-w-[100px] truncate text-neutral-600" title={trans.zh || ""}>
                          {trans.zh || "-"}
                        </TableCell>
                        <TableCell className="max-w-[100px] truncate text-neutral-600" title={trans.fr || ""}>
                          {trans.fr || "-"}
                        </TableCell>
                        <TableCell className="max-w-[100px] truncate text-neutral-600" title={trans.ja || ""}>
                          {trans.ja || "-"}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-neutral-500 hover:text-[#009edb]"
                              onClick={() => openEditTranslation({
                                key: trans.key,
                                category: trans.category || undefined,
                                en: trans.en || undefined,
                                zh: trans.zh || undefined,
                                fr: trans.fr || undefined,
                                ja: trans.ja || undefined,
                              })}
                            >
                              <Pencil className="w-3 h-3" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-neutral-500 hover:text-red-600"
                              onClick={() => {
                                if (confirm("Delete this translation?")) {
                                  deleteTranslation.mutate({ key: trans.key });
                                }
                              }}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            ) : (
              <Card className="border border-dashed border-neutral-300 bg-white">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
                    <Languages className="w-6 h-6 text-neutral-400" />
                  </div>
                  <h3 className="font-medium text-neutral-900 mb-1">{t('admin.noTranslations')}</h3>
                  <p className="text-sm text-neutral-500 mb-4">Add custom translations to override defaults.</p>
                  <Button onClick={openNewTranslation} className="bg-[#009edb] hover:bg-[#0080b3]">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Translation
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium text-neutral-900">{t('admin.users')}</h2>
              <span className="text-sm text-neutral-500">{users?.length || 0} total</span>
            </div>
            
            {usersLoading ? (
              <div className="flex justify-center py-16">
                <Loader2 className="w-6 h-6 animate-spin text-[#009edb]" />
              </div>
            ) : users && users.length > 0 ? (
              <Card className="border-0 shadow-sm overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-neutral-50 hover:bg-neutral-50">
                      <TableHead className="font-medium text-neutral-600">Name</TableHead>
                      <TableHead className="font-medium text-neutral-600">Email</TableHead>
                      <TableHead className="font-medium text-neutral-600">Role</TableHead>
                      <TableHead className="font-medium text-neutral-600">Login Method</TableHead>
                      <TableHead className="font-medium text-neutral-600">Last Sign In</TableHead>
                      <TableHead className="font-medium text-neutral-600">Joined</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((u) => (
                      <TableRow key={u.id} className="hover:bg-neutral-50">
                        <TableCell className="font-medium text-neutral-900">{u.name || "-"}</TableCell>
                        <TableCell className="text-neutral-600">{u.email || "-"}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={u.role === "admin" ? "default" : "secondary"}
                            className={u.role === "admin" ? "bg-[#009edb] font-normal" : "font-normal"}
                          >
                            {u.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-neutral-600">{u.loginMethod || "-"}</TableCell>
                        <TableCell className="text-neutral-500">
                          {new Date(u.lastSignedIn).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-neutral-500">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            ) : (
              <Card className="border border-dashed border-neutral-300 bg-white">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-neutral-400" />
                  </div>
                  <h3 className="font-medium text-neutral-900 mb-1">No Users Yet</h3>
                  <p className="text-sm text-neutral-500">Users will appear here once they sign up.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Experts Tab */}
          <TabsContent value="experts" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-medium text-neutral-900">{t('admin.experts')}</h2>
                <span className="text-sm text-neutral-500">{experts?.length || 0} total</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                  <CloudDownload className="w-3.5 h-3.5" />
                  <span>上次同步: {formatSyncTime(expertsLastSync)}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 border-[#009edb]/30 text-[#009edb] hover:bg-[#009edb]/5"
                  onClick={handleSyncExperts}
                  disabled={expertsSyncing}
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${expertsSyncing ? 'animate-spin' : ''}`} />
                  {expertsSyncing ? '同步中...' : '从远程API同步'}
                </Button>
              </div>
            </div>
            <p className="text-xs text-neutral-400 -mt-4">
              ℹ️ 调整排序后，前台页面将按此顺序显示。点击上/下箭头移动位置。支持从远程API拉取最新讲师数据。
            </p>
            
            {expertsLoading ? (
              <div className="flex justify-center py-16">
                <Loader2 className="w-6 h-6 animate-spin text-[#009edb]" />
              </div>
            ) : experts && experts.length > 0 ? (
              <Card className="border-0 shadow-sm overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-neutral-50 hover:bg-neutral-50">
                      <TableHead className="font-medium text-neutral-600 w-[100px]">排序</TableHead>
                      <TableHead className="font-medium text-neutral-600">Name (EN)</TableHead>
                      <TableHead className="font-medium text-neutral-600">Name (ZH)</TableHead>
                      <TableHead className="font-medium text-neutral-600">Role</TableHead>
                      <TableHead className="font-medium text-neutral-600">{t('admin.visibility')}</TableHead>
                      <TableHead className="font-medium text-neutral-600">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[...experts].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)).map((expert, idx) => (
                      <TableRow key={expert.id} className="hover:bg-neutral-50 group">
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-neutral-400 w-5 text-center">{idx + 1}</span>
                            <div className="flex flex-col">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 text-neutral-400 hover:text-[#009edb] disabled:opacity-30"
                                onClick={() => moveExpert(expert.id, 'up')}
                                disabled={idx === 0 || updateExpertOrder.isPending}
                                title="上移"
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 text-neutral-400 hover:text-[#009edb] disabled:opacity-30"
                                onClick={() => moveExpert(expert.id, 'down')}
                                disabled={idx === experts.length - 1 || updateExpertOrder.isPending}
                                title="下移"
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-neutral-900">{expert.nameEn}</TableCell>
                        <TableCell className="text-neutral-600">{expert.nameZh || "-"}</TableCell>
                        <TableCell className="text-neutral-600">{expert.roleEn || "-"}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={expert.isVisible === "visible" ? "default" : "secondary"}
                            className={expert.isVisible === "visible" ? "bg-[#4d9f0c] font-normal" : "font-normal"}
                          >
                            {expert.isVisible === "visible" ? t('admin.visible') : t('admin.hidden')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-neutral-500 hover:text-[#009edb]"
                            onClick={() => {
                              toggleExpertVisibility.mutate({
                                id: expert.id,
                                isVisible: expert.isVisible === "visible" ? "hidden" : "visible",
                              });
                            }}
                            disabled={toggleExpertVisibility.isPending}
                          >
                            {expert.isVisible === "visible" ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            ) : (
              <Card className="border border-dashed border-neutral-300 bg-white">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
                    <UserCheck className="w-6 h-6 text-neutral-400" />
                  </div>
                  <h3 className="font-medium text-neutral-900 mb-1">{t('admin.noExperts')}</h3>
                  <p className="text-sm text-neutral-500">Experts will appear here once added.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Partners Tab */}
          <TabsContent value="partners" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-medium text-neutral-900">{t('admin.partners')}</h2>
                <span className="text-sm text-neutral-500">{partners?.length || 0} total</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                  <CloudDownload className="w-3.5 h-3.5" />
                  <span>上次同步: {formatSyncTime(partnersLastSync)}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 border-[#009edb]/30 text-[#009edb] hover:bg-[#009edb]/5"
                  onClick={handleSyncPartners}
                  disabled={partnersSyncing}
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${partnersSyncing ? 'animate-spin' : ''}`} />
                  {partnersSyncing ? '同步中...' : '从远程API同步'}
                </Button>
              </div>
            </div>
            <p className="text-xs text-neutral-400 -mt-4">
              ℹ️ 调整排序后，前台页面将按此顺序显示。点击上/下箭头移动位置。支持从远程API拉取最新合作伙伴数据。
            </p>
            
            {partnersLoading ? (
              <div className="flex justify-center py-16">
                <Loader2 className="w-6 h-6 animate-spin text-[#009edb]" />
              </div>
            ) : partners && partners.length > 0 ? (
              <Card className="border-0 shadow-sm overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-neutral-50 hover:bg-neutral-50">
                      <TableHead className="font-medium text-neutral-600 w-[100px]">排序</TableHead>
                      <TableHead className="font-medium text-neutral-600">{t('partnerApply.orgType')}</TableHead>
                      <TableHead className="font-medium text-neutral-600">{t('partnerApply.orgName')}</TableHead>
                      <TableHead className="font-medium text-neutral-600">{t('admin.visibility')}</TableHead>
                      <TableHead className="font-medium text-neutral-600">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[...partners].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)).map((partner, idx) => (
                      <TableRow key={partner.id} className="hover:bg-neutral-50 group">
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-neutral-400 w-5 text-center">{idx + 1}</span>
                            <div className="flex flex-col">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 text-neutral-400 hover:text-[#009edb] disabled:opacity-30"
                                onClick={() => movePartner(partner.id, 'up')}
                                disabled={idx === 0 || updatePartnerOrder.isPending}
                                title="上移"
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 text-neutral-400 hover:text-[#009edb] disabled:opacity-30"
                                onClick={() => movePartner(partner.id, 'down')}
                                disabled={idx === partners.length - 1 || updatePartnerOrder.isPending}
                                title="下移"
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-normal">
                            {partner.type === 'coach' ? t('partners.coaches') : 
                             partner.type === 'brand' ? t('partners.brands') : t('partners.organizations')}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium text-neutral-900">{partner.nameEn}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={partner.isVisible === "visible" ? "default" : "secondary"}
                            className={partner.isVisible === "visible" ? "bg-green-500 font-normal" : "font-normal"}
                          >
                            {partner.isVisible === "visible" ? t('admin.visible') : t('admin.hidden')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-neutral-200 hover:border-[#009edb] hover:text-[#009edb]"
                              onClick={() => {
                                togglePartnerVisibility.mutate({
                                  id: partner.id,
                                  isVisible: partner.isVisible === "visible" ? "hidden" : "visible",
                                });
                              }}
                              disabled={togglePartnerVisibility.isPending}
                            >
                              {partner.isVisible === "visible" ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </Button>
                            <Dialog open={isPartnerDialogOpen && editingPartner === partner.id} onOpenChange={(open) => {
                              setIsPartnerDialogOpen(open);
                              if (!open) {
                                setEditingPartner(null);
                                setPartnerJsonInput("");
                              }
                            }}>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-neutral-200 hover:border-[#009edb] hover:text-[#009edb]"
                                  onClick={() => {
                                    setEditingPartner(partner.id);
                                    setPartnerJsonInput(JSON.stringify({
                                      nameEn: partner.nameEn,
                                      nameZh: partner.nameZh || "",
                                      nameFr: partner.nameFr || "",
                                      nameJa: partner.nameJa || "",
                                      descriptionEn: partner.descriptionEn || "",
                                      descriptionZh: partner.descriptionZh || "",
                                      descriptionFr: partner.descriptionFr || "",
                                      descriptionJa: partner.descriptionJa || "",
                                      logoUrl: partner.logoUrl || "",
                                      websiteUrl: partner.websiteUrl || "",
                                      contactEmail: partner.contactEmail || "",
                                    }, null, 2));
                                    setIsPartnerDialogOpen(true);
                                  }}
                                >
                                  <Pencil className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>{t('admin.editPartnerJson')}</DialogTitle>
                                  <DialogDescription>
                                    {t('admin.editPartnerJsonDesc')}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <Textarea
                                    value={partnerJsonInput}
                                    onChange={(e) => setPartnerJsonInput(e.target.value)}
                                    className="font-mono text-sm h-80"
                                    placeholder="{}"
                                  />
                                  <div className="flex justify-end gap-2">
                                    <Button
                                      variant="outline"
                                      onClick={() => {
                                        setIsPartnerDialogOpen(false);
                                        setEditingPartner(null);
                                        setPartnerJsonInput("");
                                      }}
                                    >
                                      {t('cta.cancel')}
                                    </Button>
                                    <Button
                                      className="bg-[#009edb] hover:bg-[#0080b3]"
                                      onClick={() => {
                                        if (editingPartner) {
                                          bulkUpdatePartner.mutate({
                                            id: editingPartner,
                                            json: partnerJsonInput,
                                          });
                                        }
                                      }}
                                      disabled={bulkUpdatePartner.isPending}
                                    >
                                      {bulkUpdatePartner.isPending ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                      ) : (
                                        t('cta.save')
                                      )}
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            ) : (
              <Card className="border border-dashed border-neutral-300 bg-white">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-neutral-400" />
                  </div>
                  <h3 className="font-medium text-neutral-900 mb-1">{t('admin.noPartners')}</h3>
                  <p className="text-sm text-neutral-500">Partners will appear here once added.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Partner Applications Tab */}
          <TabsContent value="partnerApps" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium text-neutral-900">{t('admin.partnerApplications')}</h2>
              <span className="text-sm text-neutral-500">{partnerApps?.length || 0} total</span>
            </div>
            
            {partnerAppsLoading ? (
              <div className="flex justify-center py-16">
                <Loader2 className="w-6 h-6 animate-spin text-[#009edb]" />
              </div>
            ) : partnerApps && partnerApps.length > 0 ? (
              <Card className="border-0 shadow-sm overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-neutral-50 hover:bg-neutral-50">
                      <TableHead className="font-medium text-neutral-600">{t('partnerApply.orgName')}</TableHead>
                      <TableHead className="font-medium text-neutral-600">{t('partnerApply.orgType')}</TableHead>
                      <TableHead className="font-medium text-neutral-600">{t('partnerApply.contactName')}</TableHead>
                      <TableHead className="font-medium text-neutral-600">Email</TableHead>
                      <TableHead className="font-medium text-neutral-600">{t('dashboard.status')}</TableHead>
                      <TableHead className="font-medium text-neutral-600">Date</TableHead>
                      <TableHead className="font-medium text-neutral-600">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {partnerApps.map((app) => (
                      <TableRow key={app.id} className="hover:bg-neutral-50">
                        <TableCell className="font-medium text-neutral-900">{app.organizationName}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-normal">
                            {app.organizationType === 'coach' ? t('partners.coaches') : 
                             app.organizationType === 'brand' ? t('partners.brands') : t('partners.organizations')}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-neutral-600">{app.contactName}</TableCell>
                        <TableCell className="text-neutral-600">{app.contactEmail}</TableCell>
                        <TableCell>{getStatusBadge(app.status)}</TableCell>
                        <TableCell className="text-neutral-500">
                          {new Date(app.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="border-neutral-200 hover:border-[#009edb] hover:text-[#009edb]"
                              >
                                {t('admin.updateStatus')}
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>{app.organizationName}</DialogTitle>
                                <DialogDescription>
                                  {app.description || t('dashboard.noDescription')}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label>{t('partnerApply.contactPhone')}</Label>
                                  <p className="text-sm text-neutral-600">{app.contactPhone || "-"}</p>
                                </div>
                                <div>
                                  <Label>{t('partnerApply.website')}</Label>
                                  <p className="text-sm text-neutral-600">{app.websiteUrl || "-"}</p>
                                </div>
                                <div>
                                  <Label>{t('dashboard.status')}</Label>
                                  <Select
                                    defaultValue={app.status}
                                    onValueChange={(value) => {
                                      updatePartnerAppStatus.mutate({
                                        id: app.id,
                                        status: value as "pending" | "reviewing" | "approved" | "rejected",
                                      });
                                    }}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="pending">{t('status.pending')}</SelectItem>
                                      <SelectItem value="reviewing">{t('status.reviewing')}</SelectItem>
                                      <SelectItem value="approved">{t('status.approved')}</SelectItem>
                                      <SelectItem value="rejected">{t('status.rejected')}</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            ) : (
              <Card className="border border-dashed border-neutral-300 bg-white">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-neutral-400" />
                  </div>
                  <h3 className="font-medium text-neutral-900 mb-1">{t('admin.noPartnerApps')}</h3>
                  <p className="text-sm text-neutral-500">Partner applications will appear here.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
