import React from 'react';
import { BarChart3, Calendar, Home, LogOut, Settings, User } from 'lucide-react';
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
          {user && (
            <>
              <NavLink to="/dashboard" icon={Calendar} label="Dashboard" />
              <NavLink to="/log" icon={Calendar} label="Trade Log" />
              <NavLink to="/analytics" icon={BarChart3} label="Analytics" />
              <NavLink to="/settings" icon={Settings} label="Settings" />
            </>
          )}
        </nav>
        
        <div className="flex items-center gap-4">
          <div className="glassmorphism px-4 py-1.5 rounded-full text-xs font-medium text-white">
            Beta v1.0
          </div>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 bg-xcraft-secondary/20">
                  <User className="h-4 w-4" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium">{user.email}</p>
                  <p className="text-xs text-muted-foreground">Trader</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="primary-dark"
              size="sm"
              onClick={() => navigate('/auth')}
            >
              Sign In
            </Button>
          )}
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
