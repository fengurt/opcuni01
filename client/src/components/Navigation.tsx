import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe, ChevronDown, User, LogOut, Shield, LayoutDashboard, Mail } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { t, setLanguage, language } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Top-level nav: HOM, UNI, DAO as primary pillars + 共创教练团 + 出海服务
  const pillarLinks = [
    { name: 'OPC HOM', href: "/hom" },
    { name: 'OPC UNI', href: "/uni" },
    { name: 'OPC DAO', href: "/dao" },
    { 
      name: language === 'zh' ? '共创教练团' : language === 'ja' ? 'コーチチーム' : language === 'fr' ? 'Coachs' : 'Co-Creation Coaches', 
      href: "/alliance" 
    },
    {
      name: language === 'zh' ? '出海服务' : language === 'ja' ? '海外展開' : language === 'fr' ? 'Expansion' : 'Go Global',
      href: "https://oversea.opcglobal.ai",
      external: true,
    },
  ];

  // More dropdown for other pages
  const moreLinks = [
    { name: language === 'zh' ? 'OPC 宇宙' : language === 'ja' ? 'OPC ユニバース' : language === 'fr' ? 'OPC Univers' : 'OPC UNIverse', href: "/universe" },
    { name: language === 'zh' ? '里程碑' : language === 'ja' ? 'マイルストーン' : language === 'fr' ? 'Jalons' : 'Milestones', href: "/milestones" },
    { name: language === 'zh' ? '课程体系' : language === 'ja' ? 'コース' : language === 'fr' ? 'Cours' : 'Courses', href: "/courses" },
    { name: language === 'zh' ? '方法论' : language === 'ja' ? 'メソドロジー' : language === 'fr' ? 'Méthodologies' : 'Methodologies', href: "/methodologies" },
    { name: language === 'zh' ? '导出中心' : language === 'ja' ? 'エクスポート' : language === 'fr' ? 'Exporter' : 'Export', href: "/export" },
  ];

  const affiliateLinks = [
    { name: language === 'zh' ? '无魔协会' : 'ManaEndless', href: "/manaendless" },
    { name: language === 'zh' ? '亚太艺术疗愈联盟' : 'APHA', href: "/apha" },
  ];

  const handleLogout = () => {
    logout();
  };

  const langLabels: Record<string, string> = { en: 'EN', zh: '中文', fr: 'FR', ja: 'JA' };

  const isActive = (href: string) => {
    if (href.startsWith('/#')) return false;
    return location === href;
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-[oklch(0.13_0.02_250/0.95)] backdrop-blur-xl shadow-[0_1px_30px_oklch(0_0_0/0.3)]"
          : "bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer group">
            <img 
              src="/images/opc-logo.png" 
              alt="OPC Global" 
              className="h-7 w-auto brightness-0 invert"
            />
            <div className="hidden sm:flex items-center gap-2.5">
              <div className="w-px h-5 bg-white/20" />
              <span className="text-sm font-medium tracking-[0.05em] text-white/80 group-hover:text-white transition-colors">
                OPC Global
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Nav — HOM | UNI | DAO | 共创教练团 | More */}
        <div className="hidden lg:flex items-center gap-0.5">
          {pillarLinks.map((link) => (
            'external' in link && link.external ? (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                <span className="px-3.5 py-2 text-[13px] font-medium tracking-wide transition-colors text-white/65 hover:text-white">
                  {link.name}
                </span>
              </a>
            ) : (
              <Link key={link.href} href={link.href}>
                <span
                  className={cn(
                    "px-3.5 py-2 text-[13px] font-medium tracking-wide transition-colors",
                    isActive(link.href)
                      ? "text-gold"
                      : "text-white/65 hover:text-white"
                  )}
                >
                  {link.name}
                </span>
              </Link>
            )
          ))}
          
          {/* More Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 px-3.5 py-2 text-[13px] font-medium text-white/60 hover:text-white transition-colors tracking-wide">
                {language === 'zh' ? '更多' : language === 'ja' ? 'もっと' : language === 'fr' ? 'Plus' : 'More'}
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-52 bg-[oklch(0.15_0.02_250)] border-white/10 shadow-2xl">
              {moreLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <DropdownMenuItem className="cursor-pointer text-[13px] py-2.5 px-4 text-white/60 hover:text-white hover:bg-white/5 focus:bg-white/5 focus:text-white">
                    {link.name}
                  </DropdownMenuItem>
                </Link>
              ))}
              <DropdownMenuSeparator className="bg-white/10" />
              <p className="text-[10px] font-semibold text-white/50 uppercase tracking-widest px-4 py-1.5">
                {language === 'zh' ? '关联机构' : 'Affiliates'}
              </p>
              {affiliateLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <DropdownMenuItem className="cursor-pointer text-[13px] py-2.5 px-4 text-white/60 hover:text-white hover:bg-white/5 focus:bg-white/5 focus:text-white">
                    {link.name}
                  </DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-2">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1.5 text-white/55 hover:text-white hover:bg-white/5 h-8 px-2.5">
                <Globe className="w-3.5 h-3.5" />
                <span className="text-[11px] font-medium tracking-wider uppercase">{langLabels[language]}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36 bg-[oklch(0.15_0.02_250)] border-white/10">
              <DropdownMenuItem onClick={() => setLanguage('en')} className="text-[13px] text-white/60 hover:text-white hover:bg-white/5 focus:bg-white/5 focus:text-white">
                <span className="w-8 text-white/50 text-[11px]">EN</span>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('zh')} className="text-[13px] text-white/60 hover:text-white hover:bg-white/5 focus:bg-white/5 focus:text-white">
                <span className="w-8 text-white/50 text-[11px]">ZH</span>
                中文
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('fr')} className="text-[13px] text-white/60 hover:text-white hover:bg-white/5 focus:bg-white/5 focus:text-white">
                <span className="w-8 text-white/50 text-[11px]">FR</span>
                Français
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('ja')} className="text-[13px] text-white/60 hover:text-white hover:bg-white/5 focus:bg-white/5 focus:text-white">
                <span className="w-8 text-white/50 text-[11px]">JA</span>
                日本語
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="w-px h-4 bg-white/10 mx-1" />

          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 h-8 text-white/60 hover:text-white hover:bg-white/5">
                  <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center">
                    <User className="w-3 h-3 text-gold" />
                  </div>
                  <span className="max-w-[80px] truncate text-[13px]">{user.name || 'User'}</span>
                  <ChevronDown className="w-3 h-3 opacity-40" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44 bg-[oklch(0.15_0.02_250)] border-white/10">
                <Link href="/dashboard">
                  <DropdownMenuItem className="cursor-pointer text-[13px] text-white/60 hover:text-white hover:bg-white/5 focus:bg-white/5 focus:text-white">
                    <LayoutDashboard className="w-3.5 h-3.5 mr-2" />
                    {t('nav.dashboard')}
                  </DropdownMenuItem>
                </Link>
                {user.role === 'admin' && (
                  <Link href="/admin">
                    <DropdownMenuItem className="cursor-pointer text-[13px] text-white/60 hover:text-white hover:bg-white/5 focus:bg-white/5 focus:text-white">
                      <Shield className="w-3.5 h-3.5 mr-2" />
                      {t('admin.title')}
                    </DropdownMenuItem>
                  </Link>
                )}
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-400 hover:bg-white/5 focus:bg-white/5 text-[13px]">
                  <LogOut className="w-3.5 h-3.5 mr-2" />
                  {t('nav.logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <a href="mailto:hi@opcglobal.ai">
              <button className="btn-gold text-sm !py-2 !px-5 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 relative z-10" />
                <span>{t('cta.join')}</span>
              </button>
            </a>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[oklch(0.13_0.02_250/0.98)] backdrop-blur-xl border-t border-white/5 animate-in slide-in-from-top-2 duration-200">
          <div className="container py-6 flex flex-col gap-1">
            {/* Primary Pillars */}
            <p className="text-[10px] font-semibold text-gold/60 uppercase tracking-widest px-3 mb-1">
              {language === 'zh' ? '三大支柱' : 'Pillars'}
            </p>
            {pillarLinks.map((link) => (
              'external' in link && link.external ? (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                  <span
                    className="block text-sm font-medium py-3 px-3 rounded transition-colors text-white/60 hover:text-white hover:bg-white/5"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </span>
                </a>
              ) : (
                <Link key={link.href} href={link.href}>
                  <span
                    className={cn(
                      "block text-sm font-medium py-3 px-3 rounded transition-colors",
                      isActive(link.href)
                        ? "text-gold bg-gold/5"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </span>
                </Link>
              )
            ))}
            
            <div className="h-px bg-white/10 my-3" />
            <p className="text-[10px] font-semibold text-white/50 uppercase tracking-widest px-3 mb-1">
              {language === 'zh' ? '更多' : 'More'}
            </p>
            {moreLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={cn(
                    "block text-sm font-medium py-3 px-3 rounded transition-colors",
                    isActive(link.href)
                      ? "text-gold bg-gold/5"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </span>
              </Link>
            ))}

            <div className="h-px bg-white/10 my-3" />
            <p className="text-[10px] font-semibold text-white/50 uppercase tracking-widest px-3 mb-1">
              {language === 'zh' ? '关联机构' : 'Affiliates'}
            </p>
            {affiliateLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className="block text-sm font-medium py-3 px-3 text-white/60 hover:text-white hover:bg-white/5 rounded transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </span>
              </Link>
            ))}
            
            {isAuthenticated && user && (
              <>
                <div className="h-px bg-white/10 my-3" />
                <Link href="/dashboard">
                  <span 
                    className="block text-sm font-medium py-3 px-3 text-white/60 hover:text-white hover:bg-white/5 rounded"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t('nav.dashboard')}
                  </span>
                </Link>
                {user.role === 'admin' && (
                  <Link href="/admin">
                    <span 
                      className="block text-sm font-medium py-3 px-3 text-white/60 hover:text-white hover:bg-white/5 rounded"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t('admin.title')}
                    </span>
                  </Link>
                )}
              </>
            )}
            
            <div className="h-px bg-white/10 my-3" />
            
            {/* Language switcher - mobile */}
            <div className="flex items-center justify-between py-2 px-3">
              <span className="text-[10px] text-white/45 uppercase tracking-widest font-semibold">
                {language === 'zh' ? '语言' : 'Language'}
              </span>
              <div className="flex gap-1">
                {(['en', 'zh', 'fr', 'ja'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={cn(
                      "px-2.5 py-1 text-[11px] font-medium tracking-wider transition-colors rounded-sm",
                      language === lang 
                        ? "bg-gold text-[oklch(0.13_0.02_250)]" 
                        : "text-white/50 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="h-px bg-white/10 my-3" />
            
            {isAuthenticated ? (
              <button 
                className="w-full text-left text-sm font-medium py-3 px-3 text-red-400 hover:bg-red-500/5 rounded transition-colors"
                onClick={handleLogout}
              >
                {t('nav.logout')}
              </button>
            ) : (
              <a href="mailto:hi@opcglobal.ai" className="block w-full mt-2">
                <button className="btn-gold w-full flex items-center justify-center gap-2">
                  <Mail className="w-3.5 h-3.5 relative z-10" />
                  <span>{t('cta.join')}</span>
                </button>
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
