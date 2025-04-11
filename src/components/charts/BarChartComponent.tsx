
import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartContainer } from '../ui/chart';

interface BarChartProps {
  data: any;
  options?: any;
}

export const BarChart = ({ data, options }: BarChartProps) => {
  return (
    <ChartContainer config={{}} className="w-full h-full">
      <RechartsBarChart data={data.labels.map((label: string, index: number) => {
        const dataPoint: Record<string, any> = { name: label };
        data.datasets.forEach((dataset: any, datasetIndex: number) => {
          dataPoint[dataset.label || `Dataset ${datasetIndex + 1}`] = dataset.data[index];
        });
        return dataPoint;
      })} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} {...options}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {data.datasets.map((dataset: any, index: number) => (
          <Bar 
            key={index} 
            dataKey={dataset.label || `Dataset ${index + 1}`} 
            fill={dataset.backgroundColor || `hsl(var(--primary) / ${0.8 - (index * 0.2)})`} 
            {...(dataset.barProps || {})}
          />
        ))}
      </RechartsBarChart>
    </ChartContainer>
  );
};
