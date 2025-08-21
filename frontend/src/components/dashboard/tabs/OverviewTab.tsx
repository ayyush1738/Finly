import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../ui/Card';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PiggyBank,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend 
} from 'recharts';
import { mockFinancialSummary, mockBills, mockGoals } from '../../../data/mockData';

const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'];

export const OverviewTab: React.FC = () => {
  const { 
    monthlyIncome, 
    monthlyExpenses, 
    totalSavings, 
    expensesByCategory, 
    monthlyTrend 
  } = mockFinancialSummary;

  const overdueBills = mockBills.filter(bill => bill.isOverdue).length;
  const activeGoals = mockGoals.length;
  const avgGoalProgress = mockGoals.reduce((sum, goal) => sum + goal.progress, 0) / mockGoals.length;

  const stats = [
    {
      title: 'Monthly Income',
      value: `₹${monthlyIncome.toLocaleString()}`,
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Monthly Expenses',
      value: `₹${monthlyExpenses.toLocaleString()}`,
      change: '-2.1%',
      changeType: 'positive' as const,
      icon: TrendingDown,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Savings',
      value: `₹${totalSavings.toLocaleString()}`,
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: PiggyBank,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Net Worth',
      value: `₹${(totalSavings + monthlyIncome - monthlyExpenses).toLocaleString()}`,
      change: '+5.8%',
      changeType: 'positive' as const,
      icon: DollarSign,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <span className={`text-sm font-medium ${
                        stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500 ml-2">from last month</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Trend */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Income vs Expenses Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrend}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString()}`, '']} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="income" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  name="Income"
                />
                <Line 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  name="Expenses"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Expense Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Expense Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expensesByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, percent }) => `${category} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="amount"
                >
                  {expensesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString()}`, 'Amount']} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-red-50 p-3 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Overdue Bills</h3>
                <p className="text-2xl font-bold text-red-600">{overdueBills}</p>
                <p className="text-sm text-gray-500">Need immediate attention</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card className="p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-50 p-3 rounded-full">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Active Goals</h3>
                <p className="text-2xl font-bold text-blue-600">{activeGoals}</p>
                <p className="text-sm text-gray-500">{avgGoalProgress.toFixed(0)}% avg progress</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card className="p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-green-50 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">This Month</h3>
                <p className="text-2xl font-bold text-green-600">
                  ₹{(monthlyIncome - monthlyExpenses).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">Money saved</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};