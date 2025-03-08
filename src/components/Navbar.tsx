import React, { useState, useEffect } from 'react';
import { BarChart3, CalendarDays, Home, LogOut, Settings, User, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header className={cn(
      "sticky top-0 z-30 w-full transition-all duration-300",
      isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
    )}>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-poppins font-bold text-xl">
              <span className="text-2xl text-[#003366]">X</span><span className="text-black">craft</span>
            </span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink to="/" icon={Home} label="Home" />
          {user && (
            <>
              <NavLink to="/dashboard" icon={CalendarDays} label="Dashboard" />
              <NavLink to="/log" icon={CalendarDays} label="Trade Log" />
              <NavLink to="/analytics" icon={BarChart3} label="Analytics" />
              <NavLink to="/settings" icon={Settings} label="Settings" />
            </>
          )}
        </nav>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:block py-1.5 px-3 rounded-full text-xs font-medium text-blue-700 bg-blue-50 border border-blue-100">
            Beta v1.0
          </div>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 bg-blue-50 hover:bg-blue-100">
                  <User className="h-4 w-4 text-blue-600" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 elegant-card p-2">
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium">{user.email}</p>
                  <p className="text-xs text-muted-foreground">Trader</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-red-500 focus:text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              size="sm"
              className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
              onClick={() => navigate('/auth')}
            >
              Sign In
            </Button>
          )}
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5 text-gray-600" />
            ) : (
              <Menu className="h-5 w-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-3 animate-fadeIn">
          <div className="container space-y-2">
            <MobileNavLink to="/" label="Home" icon={Home} onClick={() => setIsMobileMenuOpen(false)} />
            {user && (
              <>
                <MobileNavLink to="/dashboard" label="Dashboard" icon={CalendarDays} onClick={() => setIsMobileMenuOpen(false)} />
                <MobileNavLink to="/log" label="Trade Log" icon={CalendarDays} onClick={() => setIsMobileMenuOpen(false)} />
                <MobileNavLink to="/analytics" label="Analytics" icon={BarChart3} onClick={() => setIsMobileMenuOpen(false)} />
                <MobileNavLink to="/settings" label="Settings" icon={Settings} onClick={() => setIsMobileMenuOpen(false)} />
              </>
            )}
            <div className="pt-2 mt-2 border-t border-gray-100">
              <div className="py-1.5 px-3 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-100 rounded-full inline-block">
                Beta v1.0
              </div>
            </div>
          </div>
        </div>
      )}
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
        "flex items-center space-x-2 text-sm font-medium transition-colors nav-button py-1",
        isActive 
          ? "text-blue-600 font-semibold" 
          : "text-gray-600 hover:text-blue-600"
      )}
    >
      <Icon className={cn("h-4 w-4", isActive ? "text-blue-600" : "text-gray-500")} />
      <span>{label}</span>
    </Link>
  );
};

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

const MobileNavLink = ({ to, icon: Icon, label, onClick }: MobileNavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to || 
                  (to === '/dashboard' && location.pathname === '/');
  
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center space-x-3 px-2 py-2 rounded-md",
        isActive 
          ? "bg-blue-50 text-blue-600" 
          : "text-gray-700 hover:bg-gray-50"
      )}
      onClick={onClick}
    >
      <Icon className={cn("h-5 w-5", isActive ? "text-blue-600" : "text-gray-500")} />
      <span className="font-medium">{label}</span>
    </Link>
  );
};

export default Navbar;
