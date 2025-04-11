
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MarketingMetrics {
  monthlyRevenue: string;
  churnRate: string;
  growthRate: string;
}

interface MarketingDataContextType {
  metrics: MarketingMetrics;
  updateMetrics: (newMetrics: MarketingMetrics) => void;
}

const defaultMetrics: MarketingMetrics = {
  monthlyRevenue: '24780',
  churnRate: '5.2',
  growthRate: '12.5'
};

const MarketingDataContext = createContext<MarketingDataContextType | undefined>(undefined);

export const MarketingDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [metrics, setMetrics] = useState<MarketingMetrics>(defaultMetrics);

  const updateMetrics = (newMetrics: MarketingMetrics) => {
    setMetrics(newMetrics);
  };

  return (
    <MarketingDataContext.Provider value={{ metrics, updateMetrics }}>
      {children}
    </MarketingDataContext.Provider>
  );
};

export const useMarketingData = (): MarketingDataContextType => {
  const context = useContext(MarketingDataContext);
  if (context === undefined) {
    throw new Error('useMarketingData must be used within a MarketingDataProvider');
  }
  return context;
};
