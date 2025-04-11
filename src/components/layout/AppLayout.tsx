
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const AppLayout = () => {
  const { logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 pl-16 lg:pl-64 transition-all duration-300">
        <div className="container flex justify-end py-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={logout}
            className="flex items-center gap-1"
          >
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>
        <main className="container py-2 px-4 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
