
import React from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer } from '../ui/chart';
import { formatIndianRupees } from '../visualization/CurrencyFormatter';

interface PieChartProps {
  data: any;
  options?: any;
  currency?: string;
}

const formatCurrency = (value: number, currency?: string) => {
  if (!currency) return value;

  switch (currency) {
    case 'INR':
      return formatIndianRupees(value);
    default:
      return `$${value.toLocaleString()}`;
  }
};

export const PieChart = ({ data, options, currency }: PieChartProps) => {
  const transformedData = data.labels.map((label: string, index: number) => ({
    name: label,
    value: data.datasets[0].data[index]
  }));

  const colors = data.datasets[0].backgroundColor || 
    ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#8dd1e1'];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border p-2 rounded-md shadow-md">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-primary">
            {currency ? formatCurrency(payload[0].value, currency) : payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ChartContainer config={{}} className="w-full h-full">
      <RechartsPieChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }} {...options}>
        <Pie
          data={transformedData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          // Remove the label that causes overlapping
          label={false}
        >
          {transformedData.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          layout="horizontal" 
          verticalAlign="bottom" 
          align="center"
          formatter={(value) => <span className="text-sm">{value}</span>}
        />
      </RechartsPieChart>
    </ChartContainer>
  );
};
