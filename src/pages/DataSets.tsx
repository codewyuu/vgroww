
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UploadCloud, Save, Download, Plus, AlertTriangle } from 'lucide-react';

const DataSets = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Data Sets</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <UploadCloud className="h-4 w-4" />
            <span>Import</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span>New Data Set</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="marketing">
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
                    <Select defaultValue="social">
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
                    <Input id="spend" placeholder="e.g. 5000" type="number" defaultValue="5000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="acquisitions">Monthly Acquisitions</Label>
                    <Input id="acquisitions" placeholder="e.g. 500" type="number" defaultValue="500" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="conversion">Conversion Rate (%)</Label>
                    <Input id="conversion" placeholder="e.g. 2.5" type="number" defaultValue="2.5" step="0.1" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cac">Cost per Acquisition ($)</Label>
                    <Input id="cac" placeholder="e.g. 10" type="number" defaultValue="10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="period">Time Period</Label>
                    <Select defaultValue="q1_2023">
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
                  <Textarea id="notes" placeholder="Add any relevant notes about this data set" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center text-amber-500">
                <AlertTriangle className="h-4 w-4 mr-2" />
                <span className="text-sm">Remember to save your changes</span>
              </div>
              <Button className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                <span>Save Data</span>
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Marketing Data History</CardTitle>
              <CardDescription>View and edit your saved marketing data sets</CardDescription>
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
                  <TableRow>
                    <TableCell>Social Media</TableCell>
                    <TableCell>Q1 2023</TableCell>
                    <TableCell>$12,500</TableCell>
                    <TableCell className="text-right">1,250</TableCell>
                    <TableCell className="text-right">$10</TableCell>
                    <TableCell className="text-right">2.5%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Search Engine</TableCell>
                    <TableCell>Q1 2023</TableCell>
                    <TableCell>$15,000</TableCell>
                    <TableCell className="text-right">1,000</TableCell>
                    <TableCell className="text-right">$15</TableCell>
                    <TableCell className="text-right">3.2%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Content Marketing</TableCell>
                    <TableCell>Q1 2023</TableCell>
                    <TableCell>$8,000</TableCell>
                    <TableCell className="text-right">400</TableCell>
                    <TableCell className="text-right">$20</TableCell>
                    <TableCell className="text-right">1.8%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Email Marketing</TableCell>
                    <TableCell>Q1 2023</TableCell>
                    <TableCell>$3,500</TableCell>
                    <TableCell className="text-right">500</TableCell>
                    <TableCell className="text-right">$7</TableCell>
                    <TableCell className="text-right">5.1%</TableCell>
                  </TableRow>
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
