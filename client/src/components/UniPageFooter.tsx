import { Link } from "wouter";
import { ArrowRight, Home, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { mainMarketingHomePath } from "@/const";

type Lang = "en" | "zh" | "fr" | "ja";
const tx = (m: Partial<Record<Lang, string>>, lang: string) => m[lang as Lang] || m.en || "";

/** Slim footer for OPC UNI–only surfaces (/uni, /courses hub); avoids full-site Footer narrative. */
export default function UniPageFooter() {
  const { language } = useLanguage();

  return (
    <footer className="section-deep-blue border-t border-white/10">
      <div className="container py-12 md:py-14 text-center max-w-2xl mx-auto">
        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gold/80 mb-2">OPC UNI</p>
        <p className="text-sm text-white/65 leading-relaxed mb-6">
          {tx(
            {
              zh: "高等教育 AI 人才培养与入校交付 · 本区域为高校决策专用，不含 OPC Global 组织与生态全文介绍。",
              en: "Higher-ed AI talent programs and on-campus delivery. Institutional focus—full OPC Global org story lives on the main site.",
            },
            language,
          )}
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <a href="mailto:hi@opcglobal.ai" className="text-white/70 hover:text-white inline-flex items-center gap-2">
            <Mail className="w-4 h-4" />
            hi@opcglobal.ai
          </a>
          <Link href="/uni">
            <span className="text-gold/90 hover:text-gold cursor-pointer inline-flex items-center gap-1">
              {tx({ zh: "UNI 培养方案全文", en: "Full UNI blueprint" }, language)}
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
          <Link href={mainMarketingHomePath}>
            <span className="text-white/50 hover:text-white/80 cursor-pointer inline-flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              {tx({ zh: "OPC Global 官网", en: "OPC Global main site" }, language)}
            </span>
          </Link>
        </div>
        <p className="text-[11px] text-white/35 mt-8">© {new Date().getFullYear()} OPC UNI</p>
      </div>
    </footer>
  );
}
