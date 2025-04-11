
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart } from '@/components/charts';

const DistributionTab: React.FC = () => {
  // Get distribution data for pie chart
  const getDistributionData = () => {
    return {
      labels: ['Active Users', 'New Signups', 'Dormant Users'],
      datasets: [
        {
          data: [65, 25, 10],
          backgroundColor: ['#0088FE', '#FF8042', '#E0E0E0'],
        }
      ]
    };
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Distribution</CardTitle>
        <CardDescription>Current user state</CardDescription>
      </CardHeader>
      <CardContent className="h-96">
        <PieChart 
          data={getDistributionData()} 
          currency="INR"
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </CardContent>
    </Card>
  );
};

export default DistributionTab;
