
import React from 'react';
import { BarChart3, Calendar, Home, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <header className="sticky top-0 z-30 w-full bg-black/90 backdrop-blur-sm border-b border-xcraft-accent/10">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-xcraft-secondary w-8 h-8 rounded-md flex items-center justify-center">
              <span className="text-white font-montserrat font-bold text-lg">X</span>
            </div>
            <span className="font-montserrat font-bold text-xl bg-gradient-to-r from-white to-xcraft-accent bg-clip-text text-transparent">
              Xcraft
            </span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink to="/" icon={Home} label="Home" />
          <NavLink to="/dashboard" icon={Calendar} label="Dashboard" />
          <NavLink to="/log" icon={Calendar} label="Trade Log" />
          <NavLink to="/analytics" icon={BarChart3} label="Analytics" />
          <NavLink to="/settings" icon={Settings} label="Settings" />
        </nav>
        
        <div className="flex items-center gap-4">
          <div className="glassmorphism px-4 py-1.5 rounded-full text-xs font-medium text-white">
            Beta v1.0
          </div>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  icon: React.ElementType;
  label: string;
}

const NavLink = ({ to, icon: Icon, label }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to || 
                  (to === '/dashboard' && location.pathname === '/');
  
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-white text-muted-foreground",
        isActive && "text-white"
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </Link>
  );
};

export default Navbar;
