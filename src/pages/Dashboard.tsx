
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, LineChart, PieChart } from '@/components/ui/chart';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Percent, 
  BarChart3, 
  ArrowUpRight, 
  ArrowDownRight 
} from 'lucide-react';

const Dashboard = () => {
  // Mock data for charts
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'User Growth',
        data: [12, 19, 27, 39, 56, 65],
        borderColor: 'hsl(var(--primary))',
        tension: 0.4,
      },
    ],
  };

  const barChartData = {
    labels: ['Advertising', 'Content Marketing', 'Social Media', 'PR', 'Events'],
    datasets: [
      {
        label: 'Marketing ROI',
        data: [65, 59, 80, 81, 56],
        backgroundColor: 'hsl(var(--primary) / 0.8)',
      },
    ],
  };

  const pieChartData = {
    labels: ['Active Users', 'Churned', 'New'],
    datasets: [
      {
        data: [65, 20, 15],
        backgroundColor: [
          'hsl(var(--primary))',
          'hsl(var(--destructive))',
          'hsl(var(--accent))',
        ],
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button>Run Simulation</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">User Acquisition</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2,350</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />+15.3%
              </span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,780</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />+8.2%
              </span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Customer Churn</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.2%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500 flex items-center">
                <ArrowDownRight className="mr-1 h-4 w-4" />+0.5%
              </span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />+2.1%
              </span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Growth Trajectory</CardTitle>
            <CardDescription>User growth over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart 
              data={lineChartData}
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </CardContent>
        </Card>
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Marketing Channel ROI</CardTitle>
            <CardDescription>Performance by channel</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart 
              data={barChartData}
              options={{
                indexAxis: 'y',
                responsive: true,
              }}
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Marketing Spend Analysis</CardTitle>
            <CardDescription>Cost per acquisition breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart 
              data={{
                labels: ['Social Ads', 'SEM', 'Content', 'Email', 'Affiliate'],
                datasets: [
                  {
                    label: 'Spend',
                    data: [15000, 12000, 6000, 3000, 9000],
                    backgroundColor: 'hsl(var(--accent))',
                  },
                  {
                    label: 'Acquisitions',
                    data: [500, 300, 200, 250, 220],
                    backgroundColor: 'hsl(var(--primary))',
                  },
                ],
              }}
              options={{
                responsive: true,
              }}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
            <CardDescription>Current user state</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <PieChart 
              data={pieChartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                },
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
