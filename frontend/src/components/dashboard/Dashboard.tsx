import React, { useState } from 'react';
import { DashboardHeader } from './DashboardHeader';
import { DashboardTabs, TabType } from './DashboardTabs';
import { OverviewTab } from './tabs/OverviewTab';
import { BillsTab } from './tabs/BillsTab';
import { RemindersTab } from './tabs/RemindersTab';
import { GoalsTab } from './tabs/GoalsTab';
import { AIInsightsTab } from './tabs/AIInsightsTab';

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'bills':
        return <BillsTab />;
      case 'reminders':
        return <RemindersTab />;
      case 'goals':
        return <GoalsTab />;
      case 'ai-insights':
        return <AIInsightsTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <main>
        {renderActiveTab()}
      </main>
    </div>
  );
};