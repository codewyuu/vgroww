
import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { formatIndianRupees } from './CurrencyFormatter';

interface ControlPanelProps {
  marketingBudget: number;
  setMarketingBudget: (value: number) => void;
  churnRate: number;
  setChurnRate: (value: number) => void;
  showPrediction: boolean;
  setShowPrediction: (value: boolean) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  marketingBudget,
  setMarketingBudget,
  churnRate,
  setChurnRate,
  showPrediction,
  setShowPrediction
}) => {
  return (
    <div className="grid gap-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Marketing Budget: {formatIndianRupees(marketingBudget)}</Label>
          <span className="text-sm text-muted-foreground">
            {formatIndianRupees(marketingBudget / 1000)}/month
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
  );
};

export default ControlPanel;
