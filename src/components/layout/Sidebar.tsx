
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  LineChart, 
  Database, 
  Settings, 
  BookText, 
  ChevronLeft, 
  ChevronRight, 
  Moon, 
  Sun
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@/components/theme/ThemeProvider';

type NavItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  { name: 'Dashboard', path: '/', icon: <LayoutDashboard className="w-5 h-5" /> },
  { name: 'Visualization', path: '/visualization', icon: <LineChart className="w-5 h-5" /> },
  { name: 'Data Sets', path: '/datasets', icon: <Database className="w-5 h-5" /> },
  { name: 'Roadmap', path: '/roadmap', icon: <BookText className="w-5 h-5" /> },
  { name: 'Settings', path: '/settings', icon: <Settings className="w-5 h-5" /> },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div
      className={cn(
        "h-screen fixed left-0 top-0 z-40 transition-all duration-300 bg-sidebar border-r border-sidebar-border",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center justify-between p-4 h-16 border-b border-sidebar-border">
            {!collapsed && (
              <h1 className="font-bold text-xl text-sidebar-foreground">GrowthSim</h1>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
              className="ml-auto"
            >
              {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </Button>
          </div>

          <div className="px-2 py-4">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  variant={location.pathname === item.path ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start mb-1",
                    location.pathname === item.path 
                      ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                  onClick={() => navigate(item.path)}
                >
                  {item.icon}
                  {!collapsed && <span className="ml-3">{item.name}</span>}
                </Button>
              ))}
            </nav>
          </div>
        </div>

        <div className="p-4 border-t border-sidebar-border">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleTheme}
            className="w-full justify-center"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            {!collapsed && <span className="ml-2">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
          </Button>
        </div>
      </div>
    </div>
  );
};
