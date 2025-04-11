
import React from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartContainer } from '../ui/chart';

interface LineChartProps {
  data: any;
  options?: any;
}

export const LineChart = ({ data, options }: LineChartProps) => {
  return (
    <ChartContainer config={{}} className="w-full h-full">
      <RechartsLineChart data={data.labels.map((label: string, index: number) => {
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
          <Line
            key={index}
            type="monotone"
            dataKey={dataset.label || `Dataset ${index + 1}`}
            stroke={dataset.borderColor || `hsl(var(--primary) / ${0.8 - (index * 0.2)})`}
            activeDot={{ r: 8 }}
            dot={{ r: 4 }}
            strokeWidth={2}
            {...(dataset.lineProps || {})}
          />
        ))}
      </RechartsLineChart>
    </ChartContainer>
  );
};
