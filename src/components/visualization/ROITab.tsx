
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatIndianRupees } from './CurrencyFormatter';

interface ROITabProps {
  timeRange: string;
  marketingBudget: number;
  churnRate: number;
  showPrediction: boolean;
}

const ROITab: React.FC<ROITabProps> = ({
  timeRange,
  marketingBudget,
  churnRate,
  showPrediction
}) => {
  // Generate the labels based on time range
  const getLabels = () => {
    if (timeRange === "6m") 
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    else if (timeRange === "1y")
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    else 
      return ['2023 Q1', '2023 Q2', '2023 Q3', '2023 Q4', '2024 Q1', '2024 Q2', '2024 Q3', '2024 Q4'];
  };

  // Generate growth data to match the analysis in GrowthTab
  const generateGrowthData = () => {
    const labels = getLabels();
    return labels.map((_, index) => {
      const baseGrowth = (marketingBudget / 1000) * (1 + index * 0.1);
      const churnImpact = (churnRate / 100) * baseGrowth;
      return Math.max(0, baseGrowth - churnImpact + Math.random() * 10);
    });
  };

  // Calculate ROI metrics
  const calculateROI = () => {
    const growthData = generateGrowthData();
    const totalPeriods = growthData.length;
    
    // Calculate customer acquisition cost (CAC)
    const totalCustomers = growthData.reduce((sum, val) => sum + val, 0);
    const totalMarketingSpent = marketingBudget * (
      timeRange === "6m" ? 0.5 : // 6 months
      timeRange === "1y" ? 1 : // 1 year
      2 // 2 years
    );
    
    // Assume an average customer value of ₹2000 per customer
    const averageCustomerValue = 2000;
    const customerLifetimeValue = averageCustomerValue * (100 / churnRate);
    
    // Calculate CAC
    const cac = totalMarketingSpent / totalCustomers;
    
    // Calculate ROI
    const totalRevenue = totalCustomers * averageCustomerValue;
    const roi = ((totalRevenue - totalMarketingSpent) / totalMarketingSpent) * 100;
    
    // Calculate payback period (months)
    const paybackPeriod = cac / (averageCustomerValue * (1 - (churnRate / 100)));
    
    // Calculate LTV:CAC ratio
    const ltvCacRatio = customerLifetimeValue / cac;
    
    return {
      totalCustomers: Math.round(totalCustomers),
      totalMarketingSpent,
      averageCustomerValue,
      customerLifetimeValue: Math.round(customerLifetimeValue),
      cac: Math.round(cac),
      roi: Math.round(roi * 100) / 100,
      paybackPeriod: Math.round(paybackPeriod * 10) / 10,
      ltvCacRatio: Math.round(ltvCacRatio * 10) / 10,
    };
  };

  const roiMetrics = calculateROI();
  
  // Determine ROI quality based on metrics
  const getRoiQuality = () => {
    if (roiMetrics.roi < 0) return 'Poor';
    if (roiMetrics.roi < 100) return 'Below Average';
    if (roiMetrics.roi < 200) return 'Average';
    if (roiMetrics.roi < 300) return 'Good';
    return 'Excellent';
  };
  
  const getLtvCacQuality = () => {
    if (roiMetrics.ltvCacRatio < 1) return 'Poor';
    if (roiMetrics.ltvCacRatio < 3) return 'Below Average';
    if (roiMetrics.ltvCacRatio < 4) return 'Average';
    if (roiMetrics.ltvCacRatio < 5) return 'Good';
    return 'Excellent';
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>ROI Analysis</CardTitle>
          <CardDescription>Return on investment across marketing channels</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Key Metrics</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Marketing Budget:</span>
                  <span className="font-medium">{formatIndianRupees(roiMetrics.totalMarketingSpent)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Customers Acquired:</span>
                  <span className="font-medium">{roiMetrics.totalCustomers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Customer Acquisition Cost (CAC):</span>
                  <span className="font-medium">{formatIndianRupees(roiMetrics.cac)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Customer Lifetime Value (LTV):</span>
                  <span className="font-medium">{formatIndianRupees(roiMetrics.customerLifetimeValue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">LTV:CAC Ratio:</span>
                  <span className="font-medium">{roiMetrics.ltvCacRatio}x</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">CAC Payback Period:</span>
                  <span className="font-medium">{roiMetrics.paybackPeriod} months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ROI:</span>
                  <span className="font-medium">{roiMetrics.roi}%</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Analysis</h3>
              <div className="space-y-4 text-sm">
                <p>
                  Based on your current marketing budget of {formatIndianRupees(marketingBudget)} 
                  and a churn rate of {churnRate}%, we've analyzed the ROI of your marketing efforts over 
                  {timeRange === "6m" ? " 6 months" : timeRange === "1y" ? " 1 year" : " 2 years"}.
                </p>
                <p>
                  <strong>Overall ROI Quality: {getRoiQuality()}</strong><br />
                  Your marketing spend is generating a {roiMetrics.roi}% return on investment, which is considered
                  {' '}{getRoiQuality().toLowerCase()} for your industry.
                </p>
                <p>
                  <strong>Customer Acquisition Cost Analysis:</strong><br />
                  It costs approximately {formatIndianRupees(roiMetrics.cac)} to acquire one customer.
                  This investment takes {roiMetrics.paybackPeriod} months to recover.
                </p>
                <p>
                  <strong>LTV:CAC Ratio: {getLtvCacQuality()}</strong><br />
                  Your LTV:CAC ratio is {roiMetrics.ltvCacRatio}x, meaning each customer generates 
                  {roiMetrics.ltvCacRatio} times more value than it costs to acquire them.
                  A healthy SaaS business typically aims for a ratio of 3x or higher.
                </p>
                {roiMetrics.ltvCacRatio < 3 ? (
                  <p className="text-orange-600 dark:text-orange-400">
                    <strong>Recommendation:</strong> Consider optimizing your marketing channels 
                    or reducing churn to improve your LTV:CAC ratio.
                  </p>
                ) : null}
                {churnRate > 8 ? (
                  <p className="text-orange-600 dark:text-orange-400">
                    <strong>High Churn Alert:</strong> Your churn rate of {churnRate}% is negatively
                    impacting your ROI. Focus on retention strategies to improve overall returns.
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ROITab;
