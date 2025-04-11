
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import GrowthTab from '@/components/visualization/GrowthTab';
import ROITab from '@/components/visualization/ROITab';
import DistributionTab from '@/components/visualization/DistributionTab';
import ChurnTab from '@/components/visualization/ChurnTab';

const Visualization = () => {
  const [timeRange, setTimeRange] = useState("6m");
  const [marketingBudget, setMarketingBudget] = useState(20000);
  const [churnRate, setChurnRate] = useState(5);
  const [showPrediction, setShowPrediction] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Visualization</h1>
        <ToggleGroup type="single" value={timeRange} onValueChange={(value) => value && setTimeRange(value)}>
          <ToggleGroupItem value="6m" aria-label="6 Months">
            6m
          </ToggleGroupItem>
          <ToggleGroupItem value="1y" aria-label="1 Year">
            1y
          </ToggleGroupItem>
          <ToggleGroupItem value="2y" aria-label="2 Years">
            2y
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <Tabs defaultValue="growth">
        <TabsList className="grid grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="growth">Growth</TabsTrigger>
          <TabsTrigger value="roi">ROI</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="churn">Churn</TabsTrigger>
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

        <TabsContent value="distribution">
          <DistributionTab />
        </TabsContent>

        <TabsContent value="churn">
          <ChurnTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Visualization;
