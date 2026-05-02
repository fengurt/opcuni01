import { useAuth } from "@/_core/hooks/useAuth";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1">
        <Hero />
      </main>

      <Footer />
    </div>
  );
}
