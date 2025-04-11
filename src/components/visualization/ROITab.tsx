
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ROITab: React.FC = () => {
  return (
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
  );
};

export default ROITab;
