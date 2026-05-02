import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { Building2, User, Briefcase, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import type { Partner } from "../../../drizzle/schema";

type PartnerData = Partner;

export default function Partners() {
  const { t, language } = useLanguage();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  
  const { data: partners, isLoading } = trpc.partners.getVisible.useQuery();

  const getLocalizedName = (partner: PartnerData) => {
    switch (language) {
      case 'zh': return partner.nameZh || partner.nameEn;
      case 'fr': return partner.nameFr || partner.nameEn;
      case 'ja': return partner.nameJa || partner.nameEn;
      default: return partner.nameEn;
    }
  };

  const getLocalizedDescription = (partner: PartnerData) => {
    switch (language) {
      case 'zh': return partner.descriptionZh || partner.descriptionEn || '';
      case 'fr': return partner.descriptionFr || partner.descriptionEn || '';
      case 'ja': return partner.descriptionJa || partner.descriptionEn || '';
      default: return partner.descriptionEn || '';
    }
  };

  const sortByOrder = (a: PartnerData, b: PartnerData) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0);
  const coaches = (partners?.filter((p: PartnerData) => p.type === 'coach') || []).sort(sortByOrder);
  const brands = (partners?.filter((p: PartnerData) => p.type === 'brand') || []).sort(sortByOrder);
  const organizations = (partners?.filter((p: PartnerData) => p.type === 'organization') || []).sort(sortByOrder);

  if (isLoading) {
    return (
      <section id="partners" className="section-padding bg-muted/30">
        <div className="container">
          <div className="text-center">
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-muted rounded w-48 mx-auto" />
              <div className="h-4 bg-muted rounded w-80 mx-auto" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  const hasPartners = partners && partners.length > 0;

  return (
    <section id="partners" className="section-padding bg-muted/30">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[11px] text-muted-foreground uppercase tracking-[0.2em] mb-4">
            {language === 'zh' ? '生态合作伙伴' : language === 'ja' ? 'エコシステムパートナー' : language === 'fr' ? 'Partenaires' : 'Ecosystem Partners'}
          </p>
          <h2 className="mb-5 text-foreground">{t('partners.title')}</h2>
          <div className="section-divider mb-6" />
          <p className="text-muted-foreground text-sm leading-relaxed">
            {t('partners.subtitle')}
          </p>
        </div>

        {hasPartners ? (
          <div className="space-y-16">
            {/* Organizations */}
            {organizations.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 rounded bg-accent/10 flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-accent" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground" style={{ fontFamily: 'var(--font-sans)' }}>
                    {t('partners.organizations')}
                  </h3>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                  {organizations.map((partner: PartnerData) => {
                    const isExpanded = expandedId === partner.id;
                    const description = getLocalizedDescription(partner);
                    
                    return (
                      <div 
                        key={partner.id} 
                        className="bg-card border border-border p-5 md:p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-[0_4px_24px_oklch(0.15_0.03_250/0.06)]"
                      >
                        <div className="flex items-start gap-3.5">
                          {partner.logoUrl ? (
                            <img 
                              src={partner.logoUrl} 
                              alt={getLocalizedName(partner)} 
                              className="w-11 h-11 rounded object-contain bg-muted p-1.5 flex-shrink-0 border border-border" 
                            />
                          ) : (
                            <div className="w-11 h-11 rounded bg-accent/10 flex items-center justify-center flex-shrink-0">
                              <Building2 className="w-5 h-5 text-accent" />
                            </div>
                          )}
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground text-sm mb-0.5" style={{ fontFamily: 'var(--font-sans)' }}>
                              {getLocalizedName(partner)}
                            </h4>
                            {partner.websiteUrl && (
                              partner.websiteUrl.startsWith('/') ? (
                                <Link href={partner.websiteUrl} className="text-[11px] text-accent hover:underline inline-flex items-center gap-1">
                                  {language === 'zh' ? '了解更多' : language === 'ja' ? '詳細を見る' : language === 'fr' ? 'En savoir plus' : 'Learn more'}
                                  <ArrowRight className="w-3 h-3" />
                                </Link>
                              ) : (
                                <a 
                                  href={partner.websiteUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-[11px] text-accent hover:underline"
                                >
                                  {partner.websiteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                                </a>
                              )
                            )}
                          </div>
                        </div>
                        
                        {description && (
                          <div className="mt-3.5">
                            <p className={`text-xs text-muted-foreground leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}>
                              {description}
                            </p>
                            {description.length > 100 && (
                              <button
                                onClick={() => setExpandedId(isExpanded ? null : partner.id)}
                                className="mt-1.5 text-[11px] text-accent hover:underline flex items-center gap-0.5"
                              >
                                {isExpanded ? (
                                  <>{language === 'zh' ? '收起' : language === 'ja' ? '閉じる' : language === 'fr' ? 'Réduire' : 'Less'}<ChevronUp className="w-3 h-3" /></>
                                ) : (
                                  <>{language === 'zh' ? '展开' : language === 'ja' ? '続きを読む' : language === 'fr' ? 'Voir plus' : 'More'}<ChevronDown className="w-3 h-3" /></>
                                )}
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Coaches */}
            {coaches.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 rounded bg-accent/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-accent" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground" style={{ fontFamily: 'var(--font-sans)' }}>
                    {t('partners.coaches')}
                  </h3>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
                  {coaches.map((partner: PartnerData) => (
                    <div key={partner.id} className="bg-card border border-border p-4 text-center transition-all duration-300 hover:border-accent/30">
                      {partner.logoUrl ? (
                        <img src={partner.logoUrl} alt={getLocalizedName(partner)} className="w-12 h-12 rounded-full mx-auto mb-2.5 object-cover" />
                      ) : (
                        <div className="w-12 h-12 rounded-full mx-auto mb-2.5 bg-muted flex items-center justify-center">
                          <User className="w-6 h-6 text-muted-foreground" />
                        </div>
                      )}
                      <h4 className="text-xs font-medium truncate text-foreground">{getLocalizedName(partner)}</h4>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Brands */}
            {brands.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 rounded bg-accent/10 flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-accent" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground" style={{ fontFamily: 'var(--font-sans)' }}>
                    {t('partners.brands')}
                  </h3>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
                  {brands.map((partner: PartnerData) => (
                    <div key={partner.id} className="bg-card border border-border p-4 text-center transition-all duration-300 hover:border-accent/30">
                      {partner.logoUrl ? (
                        <img src={partner.logoUrl} alt={getLocalizedName(partner)} className="h-10 mx-auto mb-2.5 object-contain" />
                      ) : (
                        <div className="h-10 mx-auto mb-2.5 flex items-center justify-center">
                          <Briefcase className="w-6 h-6 text-muted-foreground" />
                        </div>
                      )}
                      <h4 className="text-xs font-medium truncate text-foreground">{getLocalizedName(partner)}</h4>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-sm">{t('partners.noPartners')}</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link href="/partner-apply" className="inline-flex items-center gap-2 text-sm text-accent hover:underline tracking-wide">
            {t('partners.becomePartner')}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
