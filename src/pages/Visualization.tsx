
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Import our new components
import GrowthTab from '@/components/visualization/GrowthTab';
import ROITab from '@/components/visualization/ROITab';
import ChurnTab from '@/components/visualization/ChurnTab';
import DistributionTab from '@/components/visualization/DistributionTab';

const Visualization = () => {
  const [timeRange, setTimeRange] = useState("6m");
  const [marketingBudget, setMarketingBudget] = useState(10000);
  const [churnRate, setChurnRate] = useState(5);
  const [showPrediction, setShowPrediction] = useState(true);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Growth Visualization</h1>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Select Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="6m">6 months</SelectItem>
            <SelectItem value="1y">1 year</SelectItem>
            <SelectItem value="2y">2 years</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="growth">
        <TabsList>
          <TabsTrigger value="growth">Growth Trajectory</TabsTrigger>
          <TabsTrigger value="roi">ROI Analysis</TabsTrigger>
          <TabsTrigger value="churn">Churn Impact</TabsTrigger>
          <TabsTrigger value="distribution">User Distribution</TabsTrigger>
        </TabsList>
        <TabsContent value="growth">
          <GrowthTab 
            timeRange={timeRange}
            marketingBudget={marketingBudget}
            setMarketingBudget={setMarketingBudget}
            churnRate={churnRate}
            setChurnRate={setChurnRate}
            showPrediction={showPrediction}
            setShowPrediction={setShowPrediction}
          />
        </TabsContent>
        <TabsContent value="roi">
          <ROITab />
        </TabsContent>
        <TabsContent value="churn">
          <ChurnTab />
        </TabsContent>
        <TabsContent value="distribution">
          <DistributionTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Visualization;
