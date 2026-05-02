import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Certification() {
  const { t } = useLanguage();
  
  const levels = [
    {
      id: "l1",
      level: "L1",
      name: t('cert.l1.name'),
      description: t('cert.l1.desc'),
      requirements: [t('cert.l1.req1'), t('cert.l1.req2'), t('cert.l1.req3')],
      privileges: [t('cert.l1.priv1'), t('cert.l1.priv2'), t('cert.l1.priv3')],
    },
    {
      id: "l2",
      level: "L2",
      name: t('cert.l2.name'),
      description: t('cert.l2.desc'),
      featured: true,
      requirements: [t('cert.l2.req1'), t('cert.l2.req2'), t('cert.l2.req3')],
      privileges: [t('cert.l2.priv1'), t('cert.l2.priv2'), t('cert.l2.priv3')],
    },
    {
      id: "l3",
      level: "L3",
      name: t('cert.l3.name'),
      description: t('cert.l3.desc'),
      requirements: [t('cert.l3.req1'), t('cert.l3.req2'), t('cert.l3.req3')],
      privileges: [t('cert.l3.priv1'), t('cert.l3.priv2'), t('cert.l3.priv3')],
    },
  ];

  return (
    <section id="certification" className="section-padding bg-muted/30">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[11px] text-muted-foreground uppercase tracking-[0.2em] mb-4">
            {t('cert.title')}
          </p>
          <h2 className="mb-5 text-foreground">{t('cert.title')}</h2>
          <div className="section-divider mb-6" />
          <p className="text-muted-foreground text-sm leading-relaxed">
            {t('cert.subtitle')}
          </p>
        </div>

        {/* Certification Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 max-w-5xl mx-auto">
          {levels.map((level) => (
            <div 
              key={level.id}
              className={cn(
                "bg-card border p-7 md:p-8 transition-all duration-300 relative",
                level.featured 
                  ? "border-accent shadow-[0_4px_24px_oklch(0.62_0.1_75/0.1)]" 
                  : "border-border hover:border-accent/30 hover:shadow-[0_4px_24px_oklch(0.15_0.03_250/0.06)]"
              )}
            >
              {level.featured && (
                <div className="absolute -top-3 left-8 text-[10px] font-semibold px-3 py-1 uppercase tracking-[0.15em] bg-accent text-white">
                  {t('cert.popular')}
                </div>
              )}

              {/* Level Badge */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-gradient-gold" style={{ fontFamily: 'var(--font-heading)' }}>{level.level}</span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <h3 className="text-lg font-semibold mb-2 text-foreground" style={{ fontFamily: 'var(--font-sans)' }}>{level.name}</h3>
              <p className="text-xs text-muted-foreground mb-7 min-h-[36px] leading-relaxed">
                {level.description}
              </p>

              {/* Requirements */}
              <div className="mb-5">
                <h4 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-3">
                  {t('cert.requirements')}
                </h4>
                <ul className="space-y-2.5">
                  {level.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs leading-relaxed">
                      <div className="w-4 h-4 rounded-full border border-border flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-muted-foreground" />
                      </div>
                      <span className="text-foreground/80">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Privileges */}
              <div className="mb-7">
                <h4 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-3">
                  {t('cert.privileges')}
                </h4>
                <ul className="space-y-2.5">
                  {level.privileges.map((privilege, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs leading-relaxed">
                      <div className="w-4 h-4 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-accent" />
                      </div>
                      <span className="text-foreground/80">{privilege}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button 
                variant={level.featured ? "default" : "outline"}
                className={cn(
                  "w-full text-[13px] tracking-wide h-10",
                  level.featured 
                    ? "bg-foreground text-background hover:bg-foreground/90" 
                    : "border-foreground/20 text-foreground hover:bg-foreground/5"
                )}
              >
                {t('cta.apply')}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
