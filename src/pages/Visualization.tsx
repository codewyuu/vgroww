
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { LineChart } from '@/components/ui/chart';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const Visualization = () => {
  const [timeRange, setTimeRange] = useState("6m");
  const [marketingBudget, setMarketingBudget] = useState(10000);
  const [churnRate, setChurnRate] = useState(5);
  const [showPrediction, setShowPrediction] = useState(true);
  
  // Mock chart data
  const getChartData = () => {
    const labels = timeRange === "6m" 
      ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
      : timeRange === "1y"
      ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      : ['2023 Q1', '2023 Q2', '2023 Q3', '2023 Q4', '2024 Q1', '2024 Q2', '2024 Q3', '2024 Q4'];

    // Generate growth data based on marketing budget and churn rate
    const growthData = labels.map((_, index) => {
      const baseGrowth = (marketingBudget / 1000) * (1 + index * 0.1);
      const churnImpact = (churnRate / 100) * baseGrowth;
      return Math.max(0, baseGrowth - churnImpact + Math.random() * 10);
    });

    // Generate prediction data
    let predictionData = [];
    if (showPrediction) {
      const lastValue = growthData[growthData.length - 1];
      predictionData = labels.map((_, index) => {
        const trend = marketingBudget / 10000 - churnRate / 10;
        return lastValue * (1 + (trend * 0.1) * (index + 1));
      });
    }

    return {
      labels,
      datasets: [
        {
          label: 'User Growth',
          data: growthData,
          borderColor: 'hsl(var(--primary))',
          tension: 0.4,
          fill: false,
        },
        ...(!showPrediction ? [] : [{
          label: 'Predicted Growth',
          data: predictionData,
          borderColor: 'rgba(180, 120, 240, 0.7)',
          borderDash: [5, 5],
          tension: 0.4,
          fill: false,
        }]),
      ],
    };
  };

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
        </TabsList>
        <TabsContent value="growth">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>User Acquisition Simulation</CardTitle>
              <CardDescription>
                Visualize your startup's growth based on different parameters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Marketing Budget: ${marketingBudget.toLocaleString()}</Label>
                    <span className="text-sm text-muted-foreground">
                      ${(marketingBudget / 1000).toFixed(1)}k/month
                    </span>
                  </div>
                  <Slider 
                    value={[marketingBudget]} 
                    min={1000} 
                    max={50000} 
                    step={1000} 
                    onValueChange={(val) => setMarketingBudget(val[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Customer Churn Rate: {churnRate}%</Label>
                    <span className="text-sm text-muted-foreground">
                      Monthly
                    </span>
                  </div>
                  <Slider 
                    value={[churnRate]} 
                    min={1} 
                    max={20} 
                    step={0.5} 
                    onValueChange={(val) => setChurnRate(val[0])}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch 
                    id="prediction" 
                    checked={showPrediction} 
                    onCheckedChange={setShowPrediction}
                  />
                  <Label htmlFor="prediction">Show Growth Prediction</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Export Data</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Projected Growth Trajectory</CardTitle>
              <CardDescription>
                Based on {timeRange === "6m" ? "6 months" : timeRange === "1y" ? "1 year" : "2 years"} of data
              </CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <LineChart 
                data={getChartData()}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'User Count'
                      }
                    },
                    x: {
                      title: {
                        display: true,
                        text: 'Time Period'
                      }
                    }
                  }
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="roi">
          <Card>
            <CardHeader>
              <CardTitle>ROI Analysis</CardTitle>
              <CardDescription>Return on investment across marketing channels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 flex items-center justify-center text-muted-foreground">
                ROI analysis visualization coming soon
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="churn">
          <Card>
            <CardHeader>
              <CardTitle>Churn Impact Analysis</CardTitle>
              <CardDescription>Visualize how churn affects your growth</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 flex items-center justify-center text-muted-foreground">
                Churn impact visualization coming soon
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Visualization;
