import React from 'react';
import { clsx } from 'clsx';
import { 
  BarChart3, 
  CreditCard, 
  Bell, 
  Target, 
  MessageCircle 
} from 'lucide-react';

export type TabType = 'overview' | 'bills' | 'reminders' | 'goals' | 'ai-insights';

interface Tab {
  id: TabType;
  label: string;
  icon: React.ComponentType<any>;
}

const tabs: Tab[] = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'bills', label: 'Bills', icon: CreditCard },
  { id: 'reminders', label: 'Reminders', icon: Bell },
  { id: 'goals', label: 'Goals', icon: Target },
  { id: 'ai-insights', label: 'AI Coach', icon: MessageCircle },
];

interface DashboardTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const DashboardTabs: React.FC<DashboardTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={clsx(
                  'flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200',
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};