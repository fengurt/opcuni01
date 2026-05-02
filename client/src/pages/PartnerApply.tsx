import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "wouter";

export default function PartnerApply() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    organizationName: "",
    organizationType: "" as "coach" | "brand" | "organization" | "",
    description: "",
    websiteUrl: "",
  });

  const submitMutation = trpc.partnerApplications.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success(t('partnerApply.success'));
    },
    onError: (error) => {
      toast.error(error.message || t('partnerApply.error'));
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.contactName || !formData.contactEmail || !formData.organizationName || !formData.organizationType) {
      toast.error(t('partnerApply.requiredFields'));
      return;
    }

    submitMutation.mutate({
      contactName: formData.contactName,
      contactEmail: formData.contactEmail,
      contactPhone: formData.contactPhone || undefined,
      organizationName: formData.organizationName,
      organizationType: formData.organizationType as "coach" | "brand" | "organization",
      description: formData.description || undefined,
      websiteUrl: formData.websiteUrl || undefined,
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-2xl font-bold mb-4">{t('partnerApply.thankYou')}</h1>
            <p className="text-muted-foreground mb-8">{t('partnerApply.successMessage')}</p>
            <Link href="/">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('dashboard.returnHome')}
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 section-padding">
        <div className="container max-w-2xl">
          {/* Back link */}
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="w-4 h-4" />
            {t('dashboard.back')}
          </Link>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-3xl font-bold mb-4">{t('partnerApply.title')}</h1>
            <p className="text-muted-foreground">{t('partnerApply.subtitle')}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold border-b pb-2">{t('partnerApply.contactInfo')}</h2>
              
              <div>
                <label className="block text-sm font-medium mb-2">{t('partnerApply.contactName')} *</label>
                <Input
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  placeholder={t('partnerApply.contactNamePlaceholder')}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t('partnerApply.contactEmail')} *</label>
                <Input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  placeholder={t('partnerApply.contactEmailPlaceholder')}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t('partnerApply.contactPhone')}</label>
                <Input
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  placeholder={t('partnerApply.contactPhonePlaceholder')}
                />
              </div>
            </div>

            {/* Organization Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold border-b pb-2">{t('partnerApply.orgInfo')}</h2>
              
              <div>
                <label className="block text-sm font-medium mb-2">{t('partnerApply.orgName')} *</label>
                <Input
                  value={formData.organizationName}
                  onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                  placeholder={t('partnerApply.orgNamePlaceholder')}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t('partnerApply.orgType')} *</label>
                <Select
                  value={formData.organizationType}
                  onValueChange={(value) => setFormData({ ...formData, organizationType: value as "coach" | "brand" | "organization" })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('partnerApply.selectType')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="coach">{t('partners.coaches')}</SelectItem>
                    <SelectItem value="brand">{t('partners.brands')}</SelectItem>
                    <SelectItem value="organization">{t('partners.organizations')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t('partnerApply.website')}</label>
                <Input
                  type="url"
                  value={formData.websiteUrl}
                  onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                  placeholder="https://"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t('partnerApply.description')}</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder={t('partnerApply.descriptionPlaceholder')}
                  rows={5}
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <Button type="submit" className="w-full" disabled={submitMutation.isPending}>
                {submitMutation.isPending ? t('partnerApply.submitting') : t('cta.submit')}
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
