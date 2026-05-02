import { useLanguage } from "@/contexts/LanguageContext";
import { Mail } from "lucide-react";

export default function Footer() {
  const { t, language } = useLanguage();
  
  return (
    <footer className="section-deep-blue">
      <div className="container">
        {/* Main Footer */}
        <div className="py-14 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img 
                src="/images/opc-logo.png" 
                alt="OPC Global" 
                className="h-7 w-auto brightness-200"
              />
              <span className="font-medium text-base tracking-wide text-white/90">
                OPC Global
              </span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-8 max-w-xs">
              {t('footer.description')}
            </p>
            
            {/* Follow Us */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/40">
                {t('footer.followUs')}
              </h4>
              <div className="flex items-center gap-3">
                {/* WeChat */}
                <div className="group relative">
                  <div className="w-9 h-9 border border-white/15 rounded flex items-center justify-center cursor-pointer hover:border-white/30 transition-colors">
                    <svg className="w-4 h-4 text-white/50 group-hover:text-white/80" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.269-.03-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/>
                    </svg>
                  </div>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="bg-white rounded-lg shadow-xl p-2.5">
                      <img src="/images/qr-wechat.png" alt="WeChat" className="w-24 h-24 object-contain" />
                      <p className="text-[10px] text-center text-foreground/60 mt-1.5">OPC之声</p>
                    </div>
                  </div>
                </div>
                
                {/* Xiaohongshu */}
                <div className="group relative">
                  <div className="w-9 h-9 border border-white/15 rounded flex items-center justify-center cursor-pointer hover:border-white/30 transition-colors">
                    <svg className="w-4 h-4 text-white/50 group-hover:text-white/80" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 14h-9a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5zm-7-6v4h2v-4h-2zm3 0v4h2v-4h-2z"/>
                    </svg>
                  </div>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="bg-white rounded-lg shadow-xl p-2.5">
                      <img src="/images/qr-xiaohongshu.png" alt="Xiaohongshu" className="w-24 h-24 object-contain" />
                      <p className="text-[10px] text-center text-foreground/60 mt-1.5">OPC之家</p>
                    </div>
                  </div>
                </div>
                
                {/* Email */}
                <a 
                  href="mailto:hi@opcglobal.ai"
                  className="w-9 h-9 border border-white/15 rounded flex items-center justify-center hover:border-white/30 transition-colors"
                >
                  <Mail className="w-4 h-4 text-white/50 hover:text-white/80" />
                </a>
                
                <a 
                  href="mailto:hi@opcglobal.ai" 
                  className="text-sm text-white/50 hover:text-white/75 transition-colors ml-1"
                >
                  hi@opcglobal.ai
                </a>
              </div>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/40 mb-5">
              {t('footer.platform')}
            </h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/#certification" className="text-white/55 hover:text-white/85 transition-colors text-sm">{t('nav.certification')}</a></li>
              <li><a href="/#experts" className="text-white/55 hover:text-white/85 transition-colors text-sm">{t('nav.experts')}</a></li>
              <li><a href="/methodologies" className="text-white/55 hover:text-white/85 transition-colors text-sm">{language === 'zh' ? '方法论' : 'Methodologies'}</a></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/40 mb-5">
              {t('footer.alliance')}
            </h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/universe" className="text-white/55 hover:text-white/85 transition-colors text-sm">OPC UNIverse</a></li>
              <li><a href="/alliance" className="text-white/55 hover:text-white/85 transition-colors text-sm">{language === 'zh' ? '联盟' : 'Alliance'}</a></li>
              <li><a href="/milestones" className="text-white/55 hover:text-white/85 transition-colors text-sm">{language === 'zh' ? '里程碑' : 'Milestones'}</a></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/40 mb-5">
              {language === 'zh' ? '三大支柱' : language === 'ja' ? '三本柱' : language === 'fr' ? 'Piliers' : 'Pillars'}
            </h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/hom" className="text-white/55 hover:text-white/85 transition-colors text-sm">OPC HOM</a></li>
              <li><a href="/uni" className="text-white/55 hover:text-white/85 transition-colors text-sm">OPC UNI</a></li>
              <li><a href="/dao" className="text-white/55 hover:text-white/85 transition-colors text-sm">OPC DAO</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-white/50">
            {t('footer.copyright')}
          </p>
          
          <div className="flex items-center gap-4 text-[11px] text-white/45">
            <span>EN</span>
            <span className="w-px h-3 bg-white/15" />
            <span>中文</span>
            <span className="w-px h-3 bg-white/15" />
            <span>FR</span>
            <span className="w-px h-3 bg-white/15" />
            <span>日本語</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
