
import React from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer } from '../ui/chart';

interface PieChartProps {
  data: any;
  options?: any;
}

export const PieChart = ({ data, options }: PieChartProps) => {
  const transformedData = data.labels.map((label: string, index: number) => ({
    name: label,
    value: data.datasets[0].data[index]
  }));

  const colors = data.datasets[0].backgroundColor || 
    ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#8dd1e1'];

  return (
    <ChartContainer config={{}} className="w-full h-full">
      <RechartsPieChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }} {...options}>
        <Pie
          data={transformedData}
          cx="50%"
          cy="50%"
          labelLine={true}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {transformedData.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </RechartsPieChart>
    </ChartContainer>
  );
};
