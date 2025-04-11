
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Save, RefreshCw } from 'lucide-react';
import { useTheme } from '@/components/theme/ThemeProvider';

const Settings = () => {
  const { theme, setTheme } = useTheme();

  const handleSaveSettings = () => {
    toast.success("Settings saved successfully");
  };

  const handleResetSimulations = () => {
    toast.info("Simulation data has been reset");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="simulation">Simulation</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account information and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="Your email" defaultValue="john@example.com" type="email" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" placeholder="Your company" defaultValue="Acme Inc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" placeholder="Your role" defaultValue="Founder" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select defaultValue="saas">
                  <SelectTrigger id="industry">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="saas">SaaS</SelectItem>
                    <SelectItem value="ecommerce">E-Commerce</SelectItem>
                    <SelectItem value="fintech">FinTech</SelectItem>
                    <SelectItem value="health">Health & Wellness</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="notifications" defaultChecked />
                <Label htmlFor="notifications">Receive email notifications about simulation results</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="flex items-center gap-2" onClick={handleSaveSettings}>
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the look and feel of the application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      id="theme-light" 
                      name="theme" 
                      className="h-4 w-4" 
                      checked={theme === 'light'}
                      onChange={() => setTheme('light')}
                    />
                    <label htmlFor="theme-light">Light</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      id="theme-dark" 
                      name="theme" 
                      className="h-4 w-4"
                      checked={theme === 'dark'}
                      onChange={() => setTheme('dark')}
                    />
                    <label htmlFor="theme-dark">Dark</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      id="theme-system" 
                      name="theme" 
                      className="h-4 w-4"
                      checked={theme === 'system'}
                      onChange={() => setTheme('system')}
                    />
                    <label htmlFor="theme-system">System</label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="density">Data Density</Label>
                <Select defaultValue="comfortable">
                  <SelectTrigger id="density">
                    <SelectValue placeholder="Select density" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="comfortable">Comfortable</SelectItem>
                    <SelectItem value="compact">Compact</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="charts">Default Chart Style</Label>
                <Select defaultValue="light">
                  <SelectTrigger id="charts">
                    <SelectValue placeholder="Select chart style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="colorful">Colorful</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="animations" defaultChecked />
                <Label htmlFor="animations">Enable animations</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="flex items-center gap-2" onClick={handleSaveSettings}>
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="simulation">
          <Card>
            <CardHeader>
              <CardTitle>Simulation Settings</CardTitle>
              <CardDescription>Configure parameters for your growth simulations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="model">Default Growth Model</Label>
                <Select defaultValue="hyper">
                  <SelectTrigger id="model">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hyper">Hyper Growth</SelectItem>
                    <SelectItem value="sustainable">Sustainable Growth</SelectItem>
                    <SelectItem value="conservative">Conservative</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timeframe">Default Timeframe</Label>
                  <Select defaultValue="6m">
                    <SelectTrigger id="timeframe">
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3m">3 Months</SelectItem>
                      <SelectItem value="6m">6 Months</SelectItem>
                      <SelectItem value="1y">1 Year</SelectItem>
                      <SelectItem value="2y">2 Years</SelectItem>
                      <SelectItem value="5y">5 Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="gbp">GBP (£)</SelectItem>
                      <SelectItem value="jpy">JPY (¥)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="advanced_simulation" />
                <Label htmlFor="advanced_simulation">Enable advanced simulation features (Beta)</Label>
              </div>
              
              <div className="pt-4">
                <Button 
                  variant="destructive" 
                  className="flex items-center gap-2"
                  onClick={handleResetSimulations}
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Reset All Simulation Data</span>
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="flex items-center gap-2" onClick={handleSaveSettings}>
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Configure advanced application options</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="data_export" defaultChecked />
                  <Label htmlFor="data_export">Enable data export functionality</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="api_access" />
                  <Label htmlFor="api_access">Enable API access (Coming soon)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="beta_features" />
                  <Label htmlFor="beta_features">Opt into beta features</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="flex items-center gap-2" onClick={handleSaveSettings}>
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
