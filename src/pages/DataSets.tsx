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
import { UploadCloud, Save, Download, Plus, AlertTriangle, FileUp, X, Calculator } from 'lucide-react';
import { parseCSV, objectsToCSV, downloadFile } from '@/utils/csvUtils';
import { useMarketingData } from '@/context/MarketingDataContext';

type MarketingData = {
  channel: string;
  period: string;
  spend: string;
  acquisitions: string;
  cac: string;
  conversion: string;
  monthlyRevenue?: string;
  churnRate?: string;
  growthRate?: string;
  notes?: string;
};

type DataSetType = {
  id: string;
  name: string;
  type: string;
  createdAt: string;
};

const DataSets = () => {
  const { updateMetrics } = useMarketingData();
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

  const [customDataSets, setCustomDataSets] = useState<DataSetType[]>([]);

  const [channel, setChannel] = useState('social');
  const [spend, setSpend] = useState('5000');
  const [acquisitions, setAcquisitions] = useState('500');
  const [conversion, setConversion] = useState('2.5');
  const [cac, setCAC] = useState('10');
  const [period, setPeriod] = useState('q1_2023');
  const [notes, setNotes] = useState('');
  
  const [revenuePerCustomer, setRevenuePerCustomer] = useState('100');
  const [previousAcquisitions, setPreviousAcquisitions] = useState('450');
  const [churnPercentage, setChurnPercentage] = useState('5');
  const [monthlyRevenue, setMonthlyRevenue] = useState('');
  const [churnRate, setChurnRate] = useState('');
  const [growthRate, setGrowthRate] = useState('');
  
  const [newDataSetName, setNewDataSetName] = useState('');
  const [showNewDataSetForm, setShowNewDataSetForm] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const csvContent = event.target?.result as string;
        const parsedData = parseCSV(csvContent);
        
        if (activeTab === "marketing") {
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
      
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    
    reader.onerror = () => {
      toast.error("Error reading file");
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    
    reader.readAsText(file);
  };

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

  const handleSaveData = () => {
    const cleanMonthlyRevenue = monthlyRevenue.replace(/[$,]/g, '');
    const cleanChurnRate = churnRate.replace(/%/g, '');
    const cleanGrowthRate = growthRate.replace(/%/g, '');
    
    if (cleanMonthlyRevenue && cleanChurnRate && cleanGrowthRate) {
      updateMetrics({
        monthlyRevenue: cleanMonthlyRevenue,
        churnRate: cleanChurnRate,
        growthRate: cleanGrowthRate
      });
      toast.success("Dashboard metrics updated successfully");
    }

    const newEntry: MarketingData = {
      channel: getChannelLabel(channel),
      period: getPeriodLabel(period),
      spend: `$${spend}`,
      acquisitions: acquisitions,
      cac: `$${cac}`,
      conversion: `${conversion}%`,
      monthlyRevenue: monthlyRevenue ? `$${monthlyRevenue}` : undefined,
      churnRate: churnRate ? `${churnRate}%` : undefined,
      growthRate: growthRate ? `${growthRate}%` : undefined,
      notes: notes
    };

    setMarketingData([...marketingData, newEntry]);
    toast.success("Data saved successfully");
    
    setMonthlyRevenue('');
    setChurnRate('');
    setGrowthRate('');
    setNotes('');
  };

  const calculateFormulas = () => {
    try {
      const calculatedMonthlyRevenue = (parseFloat(acquisitions) * parseFloat(revenuePerCustomer)).toFixed(2);
      
      const calculatedChurnRate = churnPercentage;
      
      const acquisitionsDiff = parseFloat(acquisitions) - parseFloat(previousAcquisitions);
      const calculatedGrowthRate = ((acquisitionsDiff / parseFloat(previousAcquisitions)) * 100).toFixed(2);
      
      setMonthlyRevenue(calculatedMonthlyRevenue);
      setChurnRate(calculatedChurnRate);
      setGrowthRate(calculatedGrowthRate);
      
      toast.success("Formulas calculated successfully");
    } catch (error) {
      console.error("Error calculating formulas:", error);
      toast.error("Error calculating formulas. Please check your inputs.");
    }
  };

  const handleCreateNewDataSet = () => {
    setShowNewDataSetForm(true);
  };

  const handleSaveNewDataSet = () => {
    if (!newDataSetName.trim()) {
      toast.error("Please enter a data set name");
      return;
    }
    
    const newDataSet: DataSetType = {
      id: `dataset-${Date.now()}`,
      name: newDataSetName,
      type: 'custom',
      createdAt: new Date().toISOString()
    };
    
    setCustomDataSets([...customDataSets, newDataSet]);
    setNewDataSetName('');
    toast.success(`New data set "${newDataSetName}" created successfully`);
  };

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
          <Button 
            className="flex items-center gap-2"
            onClick={handleCreateNewDataSet}
          >
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

                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium mb-4">Formula Calculations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="revenuePerCustomer">Revenue Per Customer ($)</Label>
                      <Input 
                        id="revenuePerCustomer" 
                        placeholder="e.g. 100" 
                        type="number" 
                        value={revenuePerCustomer}
                        onChange={(e) => setRevenuePerCustomer(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="previousAcquisitions">Previous Period Acquisitions</Label>
                      <Input 
                        id="previousAcquisitions" 
                        placeholder="e.g. 450" 
                        type="number" 
                        value={previousAcquisitions}
                        onChange={(e) => setPreviousAcquisitions(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="churnPercentage">Churn Percentage (%)</Label>
                      <Input 
                        id="churnPercentage" 
                        placeholder="e.g. 5" 
                        type="number" 
                        step="0.1" 
                        value={churnPercentage}
                        onChange={(e) => setChurnPercentage(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="monthlyRevenue">Monthly Revenue</Label>
                      <Input 
                        id="monthlyRevenue" 
                        value={monthlyRevenue ? `$${monthlyRevenue}` : ''}
                        readOnly
                        className="bg-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="churnRate">Churn Rate</Label>
                      <Input 
                        id="churnRate" 
                        value={churnRate ? `${churnRate}%` : ''}
                        readOnly
                        className="bg-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="growthRate">Growth Rate</Label>
                      <Input 
                        id="growthRate" 
                        value={growthRate ? `${growthRate}%` : ''}
                        readOnly
                        className="bg-muted"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center text-amber-500">
                <AlertTriangle className="h-4 w-4 mr-2" />
                <span className="text-sm">Remember to save your changes</span>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2" 
                  onClick={calculateFormulas}
                >
                  <Calculator className="h-4 w-4" />
                  <span>Calculate</span>
                </Button>
                <Button className="flex items-center gap-2" onClick={handleSaveData}>
                  <Save className="h-4 w-4" />
                  <span>Save Data</span>
                </Button>
              </div>
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
                    <TableHead className="text-right">Monthly Revenue</TableHead>
                    <TableHead className="text-right">Churn Rate</TableHead>
                    <TableHead className="text-right">Growth Rate</TableHead>
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
                      <TableCell className="text-right">{row.monthlyRevenue || '-'}</TableCell>
                      <TableCell className="text-right">{row.churnRate || '-'}</TableCell>
                      <TableCell className="text-right">{row.growthRate || '-'}</TableCell>
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

      {showNewDataSetForm && (
        <Card className="mt-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>New Custom Data Set</CardTitle>
              <CardDescription>Create a new custom data set for your specific needs</CardDescription>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setShowNewDataSetForm(false)}
              className="rounded-full h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="space-y-2">
                <Label htmlFor="dataSetName">Data Set Name</Label>
                <Input 
                  id="dataSetName" 
                  placeholder="Enter a name for your data set"
                  value={newDataSetName}
                  onChange={(e) => setNewDataSetName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customChannel">Channel</Label>
                  <Select defaultValue="social">
                    <SelectTrigger id="customChannel">
                      <SelectValue placeholder="Select channel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="social">Social Media</SelectItem>
                      <SelectItem value="search">Search Engine</SelectItem>
                      <SelectItem value="email">Email Marketing</SelectItem>
                      <SelectItem value="content">Content Marketing</SelectItem>
                      <SelectItem value="affiliate">Affiliate</SelectItem>
                      <SelectItem value="custom">Custom Channel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customSpend">Monthly Spend ($)</Label>
                  <Input 
                    id="customSpend" 
                    placeholder="e.g. 5000" 
                    type="number" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customAcquisitions">Monthly Acquisitions</Label>
                  <Input 
                    id="customAcquisitions" 
                    placeholder="e.g. 500" 
                    type="number" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customConversion">Conversion Rate (%)</Label>
                  <Input 
                    id="customConversion" 
                    placeholder="e.g. 2.5" 
                    type="number" 
                    step="0.1" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customCac">Cost per Acquisition ($)</Label>
                  <Input 
                    id="customCac" 
                    placeholder="e.g. 10" 
                    type="number" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customPeriod">Time Period</Label>
                  <Select defaultValue="q1_2023">
                    <SelectTrigger id="customPeriod">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="q1_2023">Q1 2023</SelectItem>
                      <SelectItem value="q2_2023">Q2 2023</SelectItem>
                      <SelectItem value="q3_2023">Q3 2023</SelectItem>
                      <SelectItem value="q4_2023">Q4 2023</SelectItem>
                      <SelectItem value="q1_2024">Q1 2024</SelectItem>
                      <SelectItem value="custom">Custom Period</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="customNotes">Notes</Label>
                <Textarea 
                  id="customNotes" 
                  placeholder="Add any relevant notes about this data set" 
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex items-center text-amber-500">
              <AlertTriangle className="h-4 w-4 mr-2" />
              <span className="text-sm">Fill in all required fields</span>
            </div>
            <Button className="flex items-center gap-2" onClick={handleSaveNewDataSet}>
              <Save className="h-4 w-4" />
              <span>Create Data Set</span>
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default DataSets;
