
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ChurnTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Churn Impact Analysis</CardTitle>
        <CardDescription>Visualize how churn affects your growth</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-96 flex items-center justify-center text-muted-foreground">
          Churn impact visualization coming soon
        </div>
      </CardContent>
    </Card>
  );
};

export default ChurnTab;
