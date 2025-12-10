import { Outlet, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useWebsiteController } from "@/hooks/useWebsiteController";

export const MainLayout = () => {
  const location = useLocation();
  useWebsiteController();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-40">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="font-bold text-xl">
              ChatBot POC
            </Link>

            <nav className="flex gap-6 items-center">
              <Link to="/">
                <Button variant={isActive("/") ? "default" : "ghost"} size="sm">
                  Home
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button
                  variant={isActive("/dashboard") ? "default" : "ghost"}
                  size="sm"
                >
                  Dashboard
                </Button>
              </Link>
              <Link to="/pricing">
                <Button
                  variant={isActive("/pricing") ? "default" : "ghost"}
                  size="sm"
                >
                  Pricing
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  variant={isActive("/contact") ? "default" : "ghost"}
                  size="sm"
                >
                  Contact
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t py-8 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 ChatBot POC. Built with React, Vite & Shadcn UI.
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Documentation
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
