
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { UploadCloud, Save, Download, Plus, AlertTriangle, FileUp } from 'lucide-react';
import { parseCSV, objectsToCSV, downloadFile } from '@/utils/csvUtils';

type MarketingData = {
  channel: string;
  period: string;
  spend: string;
  acquisitions: string;
  cac: string;
  conversion: string;
  notes?: string;
};

const DataSets = () => {
  const [activeTab, setActiveTab] = useState("marketing");
  const [marketingData, setMarketingData] = useState<MarketingData[]>([
    {
      channel: 'Social Media',
      period: 'Q1 2023',
      spend: '$12,500',
      acquisitions: '1,250',
      cac: '$10',
      conversion: '2.5%',
      notes: ''
    },
    {
      channel: 'Search Engine',
      period: 'Q1 2023',
      spend: '$15,000',
      acquisitions: '1,000',
      cac: '$15',
      conversion: '3.2%',
      notes: ''
    },
    {
      channel: 'Content Marketing',
      period: 'Q1 2023',
      spend: '$8,000',
      acquisitions: '400',
      cac: '$20',
      conversion: '1.8%',
      notes: ''
    },
    {
      channel: 'Email Marketing',
      period: 'Q1 2023',
      spend: '$3,500',
      acquisitions: '500',
      cac: '$7',
      conversion: '5.1%',
      notes: ''
    }
  ]);

  // Form states
  const [channel, setChannel] = useState('social');
  const [spend, setSpend] = useState('5000');
  const [acquisitions, setAcquisitions] = useState('500');
  const [conversion, setConversion] = useState('2.5');
  const [cac, setCAC] = useState('10');
  const [period, setPeriod] = useState('q1_2023');
  const [notes, setNotes] = useState('');

  // File import reference
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file upload button click
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Handle file import
  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const csvContent = event.target?.result as string;
        const parsedData = parseCSV(csvContent);
        
        if (activeTab === "marketing") {
          // Map CSV data to marketing data format
          const newMarketingData = parsedData.map(row => ({
            channel: row.channel || '',
            period: row.period || '',
            spend: row.spend || '',
            acquisitions: row.acquisitions || '',
            cac: row.cac || '',
            conversion: row.conversion || '',
            notes: row.notes || ''
          }));
          
          setMarketingData(newMarketingData);
          toast.success(`Successfully imported ${newMarketingData.length} rows of data`);
        } else {
          toast.info("Import for this data type is coming soon");
        }
      } catch (error) {
        console.error("Error importing CSV:", error);
        toast.error("Failed to import CSV. Please check the file format.");
      }
      
      // Reset the file input
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    
    reader.onerror = () => {
      toast.error("Error reading file");
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    
    reader.readAsText(file);
  };

  // Handle data export
  const handleExport = () => {
    try {
      let filename = '';
      let csvContent = '';
      
      if (activeTab === "marketing") {
        filename = `marketing_data_${new Date().toISOString().split('T')[0]}.csv`;
        csvContent = objectsToCSV(marketingData);
      } else {
        toast.info("Export for this data type is coming soon");
        return;
      }
      
      downloadFile(csvContent, filename);
      toast.success("Data successfully exported");
    } catch (error) {
      console.error("Error exporting data:", error);
      toast.error("Failed to export data");
    }
  };

  // Handle save form data
  const handleSaveData = () => {
    const newEntry: MarketingData = {
      channel: getChannelLabel(channel),
      period: getPeriodLabel(period),
      spend: `$${spend}`,
      acquisitions: acquisitions,
      cac: `$${cac}`,
      conversion: `${conversion}%`,
      notes: notes
    };

    setMarketingData([...marketingData, newEntry]);
    toast.success("Data saved successfully");
    
    // Reset form (optional)
    setNotes('');
  };

  // Helper functions to get labels
  const getChannelLabel = (value: string): string => {
    const channelMap: Record<string, string> = {
      'social': 'Social Media',
      'search': 'Search Engine',
      'email': 'Email Marketing',
      'content': 'Content Marketing',
      'affiliate': 'Affiliate'
    };
    return channelMap[value] || value;
  };

  const getPeriodLabel = (value: string): string => {
    const periodMap: Record<string, string> = {
      'q1_2023': 'Q1 2023',
      'q2_2023': 'Q2 2023',
      'q3_2023': 'Q3 2023',
      'q4_2023': 'Q4 2023',
      'q1_2024': 'Q1 2024'
    };
    return periodMap[value] || value;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Data Sets</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2" 
            onClick={handleUploadClick}
          >
            <UploadCloud className="h-4 w-4" />
            <span>Import</span>
          </Button>
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleFileImport}
          />
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleExport}
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span>New Data Set</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="marketing" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="marketing">Marketing Data</TabsTrigger>
          <TabsTrigger value="users">User Data</TabsTrigger>
          <TabsTrigger value="financial">Financial Data</TabsTrigger>
        </TabsList>
        <TabsContent value="marketing">
          <Card>
            <CardHeader>
              <CardTitle>Marketing Channel Performance</CardTitle>
              <CardDescription>Enter your marketing campaign data to analyze performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="channel">Channel</Label>
                    <Select defaultValue="social" value={channel} onValueChange={setChannel}>
                      <SelectTrigger id="channel">
                        <SelectValue placeholder="Select channel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="social">Social Media</SelectItem>
                        <SelectItem value="search">Search Engine</SelectItem>
                        <SelectItem value="email">Email Marketing</SelectItem>
                        <SelectItem value="content">Content Marketing</SelectItem>
                        <SelectItem value="affiliate">Affiliate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="spend">Monthly Spend ($)</Label>
                    <Input 
                      id="spend" 
                      placeholder="e.g. 5000" 
                      type="number" 
                      value={spend}
                      onChange={(e) => setSpend(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="acquisitions">Monthly Acquisitions</Label>
                    <Input 
                      id="acquisitions" 
                      placeholder="e.g. 500" 
                      type="number" 
                      value={acquisitions}
                      onChange={(e) => setAcquisitions(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="conversion">Conversion Rate (%)</Label>
                    <Input 
                      id="conversion" 
                      placeholder="e.g. 2.5" 
                      type="number" 
                      step="0.1" 
                      value={conversion}
                      onChange={(e) => setConversion(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cac">Cost per Acquisition ($)</Label>
                    <Input 
                      id="cac" 
                      placeholder="e.g. 10" 
                      type="number" 
                      value={cac}
                      onChange={(e) => setCAC(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="period">Time Period</Label>
                    <Select defaultValue="q1_2023" value={period} onValueChange={setPeriod}>
                      <SelectTrigger id="period">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="q1_2023">Q1 2023</SelectItem>
                        <SelectItem value="q2_2023">Q2 2023</SelectItem>
                        <SelectItem value="q3_2023">Q3 2023</SelectItem>
                        <SelectItem value="q4_2023">Q4 2023</SelectItem>
                        <SelectItem value="q1_2024">Q1 2024</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Add any relevant notes about this data set"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center text-amber-500">
                <AlertTriangle className="h-4 w-4 mr-2" />
                <span className="text-sm">Remember to save your changes</span>
              </div>
              <Button className="flex items-center gap-2" onClick={handleSaveData}>
                <Save className="h-4 w-4" />
                <span>Save Data</span>
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="mt-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Marketing Data History</CardTitle>
                <CardDescription>View and edit your saved marketing data sets</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <FileUp className="h-3 w-3" />
                Upload Template
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Channel</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Spend</TableHead>
                    <TableHead className="text-right">Acquisitions</TableHead>
                    <TableHead className="text-right">CAC</TableHead>
                    <TableHead className="text-right">Conversion</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {marketingData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.channel}</TableCell>
                      <TableCell>{row.period}</TableCell>
                      <TableCell>{row.spend}</TableCell>
                      <TableCell className="text-right">{row.acquisitions}</TableCell>
                      <TableCell className="text-right">{row.cac}</TableCell>
                      <TableCell className="text-right">{row.conversion}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Growth & Retention</CardTitle>
              <CardDescription>Enter user acquisition and churn data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72 flex items-center justify-center text-muted-foreground">
                User data input form coming soon
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="financial">
          <Card>
            <CardHeader>
              <CardTitle>Financial Performance Data</CardTitle>
              <CardDescription>Enter revenue and cost metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72 flex items-center justify-center text-muted-foreground">
                Financial data input form coming soon
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataSets;
