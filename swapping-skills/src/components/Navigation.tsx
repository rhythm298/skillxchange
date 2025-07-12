import { Home, User, Users, MessageSquare, Settings, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";

export const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: User, label: "Profile", path: "/profile" },
    { icon: Users, label: "Browse", path: "/browse" },
    { icon: MessageSquare, label: "Requests", path: "/requests" },
    { icon: Settings, label: "Settings", path: "/settings" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">SS</span>
            </div>
            <span className="text-lg font-bold gradient-text">SkillSwap</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${
                    isActive 
                      ? "text-primary" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Search and User Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="w-4 h-4" />
            </Button>
            
            {/* Mobile menu button would go here */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent"></div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 glass-card border-t border-white/10">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 p-2 transition-colors ${
                  isActive 
                    ? "text-primary" 
                    : "text-muted-foreground"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};