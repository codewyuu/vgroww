
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart } from '@/components/charts';
import ControlPanel from './ControlPanel';
import { downloadFile, objectsToCSV } from '@/utils/csvUtils';
import { toast } from 'sonner';

interface GrowthTabProps {
  timeRange: string;
  marketingBudget: number;
  setMarketingBudget: (value: number) => void;
  churnRate: number;
  setChurnRate: (value: number) => void;
  showPrediction: boolean;
  setShowPrediction: (value: boolean) => void;
}

const GrowthTab: React.FC<GrowthTabProps> = ({
  timeRange,
  marketingBudget,
  setMarketingBudget,
  churnRate,
  setChurnRate,
  showPrediction,
  setShowPrediction
}) => {
  // Generate chart data based on the parameters
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

  const handleExportData = () => {
    try {
      const chartData = getChartData();
      
      // Transform the chart data into a format suitable for CSV export
      const exportData = chartData.labels.map((label, index) => {
        const dataRow: Record<string, any> = {
          Period: label
        };
        
        // Add actual growth data
        dataRow['User Growth'] = Math.round(chartData.datasets[0].data[index]);
        
        // Add prediction data if available
        if (showPrediction && chartData.datasets.length > 1) {
          dataRow['Predicted Growth'] = Math.round(chartData.datasets[1].data[index]);
        }
        
        return dataRow;
      });
      
      // Generate the CSV content
      const csvContent = objectsToCSV(exportData);
      
      // Generate a filename with current date
      const dateString = new Date().toISOString().split('T')[0];
      const filename = `growth_trajectory_${timeRange}_${dateString}.csv`;
      
      // Download the file
      downloadFile(csvContent, filename);
      
      // Show success message
      toast.success('Growth data exported successfully');
    } catch (error) {
      console.error('Error exporting data:', error);
      toast.error('Failed to export growth data');
    }
  };

  return (
    <>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>User Acquisition Simulation</CardTitle>
          <CardDescription>
            Visualize your startup's growth based on different parameters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ControlPanel 
            marketingBudget={marketingBudget}
            setMarketingBudget={setMarketingBudget}
            churnRate={churnRate}
            setChurnRate={setChurnRate}
            showPrediction={showPrediction}
            setShowPrediction={setShowPrediction}
          />
        </CardContent>
        <CardFooter>
          <Button onClick={handleExportData}>Export Data</Button>
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
    </>
  );
};

export default GrowthTab;
