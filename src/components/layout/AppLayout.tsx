
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';

const AppLayout = () => {
  const { logout } = useAuth();
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className={cn(
        "flex-1 transition-all duration-300",
        isMobile ? "pl-[3.5rem]" : "pl-16 lg:pl-64"
      )}>
        <div className="container flex justify-end py-2 sm:py-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={logout}
            className="flex items-center gap-1"
          >
            <LogOut className="h-4 w-4" /> {!isMobile && "Logout"}
          </Button>
        </div>
        <main className="container py-2 px-2 sm:px-4 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
