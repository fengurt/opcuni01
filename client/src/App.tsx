import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import PartnerApply from "./pages/PartnerApply";
import Milestones from "./pages/Milestones";
import Alliance from "./pages/Alliance";
import Dao from "./pages/Dao";
import Hub from "./pages/Hub";
import Hom from "./pages/Hom";
import Uni from "./pages/Uni";
import Universe from "./pages/Universe";
import Methodologies from "./pages/Methodologies";
import ExportCenter from "./pages/ExportCenter";
import Courses from "./pages/Courses";
import ManaEndless from "./pages/ManaEndless";
import Apha from "./pages/Apha";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/dashboard"} component={Dashboard} />
      <Route path={"/admin"} component={Admin} />
      <Route path={"/partner-apply"} component={PartnerApply} />
      <Route path={"/milestones"} component={Milestones} />
      <Route path={"/alliance"} component={Alliance} />
      <Route path={"/dao"} component={Dao} />
      <Route path={"/hub"} component={Hub} />
      <Route path={"/hom"} component={Hom} />
      <Route path={"/uni"} component={Uni} />
      <Route path={"/universe"} component={Universe} />
      <Route path={"/methodologies"} component={Methodologies} />
      <Route path={"/export"} component={ExportCenter} />
      <Route path={"/courses"} component={Courses} />
      <Route path={"/manaendless"} component={ManaEndless} />
      <Route path={"/apha"} component={Apha} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
