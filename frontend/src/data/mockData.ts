import { Bill, Goal, Transaction, FinancialSummary } from '../types';
import { addDays, subDays, subMonths } from 'date-fns';

export const mockBills: Bill[] = [
  {
    id: '1',
    name: 'Rent',
    amount: 25000,
    dueDate: new Date(2025, 0, 5),
    category: 'Housing',
    isRecurring: true,
    isPaid: true,
    isOverdue: false,
  },
  {
    id: '2',
    name: 'Electricity Bill',
    amount: 2500,
    dueDate: addDays(new Date(), 3),
    category: 'Utilities',
    isRecurring: true,
    isPaid: false,
    isOverdue: false,
  },
  {
    id: '3',
    name: 'Internet',
    amount: 1200,
    dueDate: subDays(new Date(), 2),
    category: 'Utilities',
    isRecurring: true,
    isPaid: false,
    isOverdue: true,
  },
  {
    id: '4',
    name: 'Phone Bill',
    amount: 800,
    dueDate: addDays(new Date(), 7),
    category: 'Utilities',
    isRecurring: true,
    isPaid: false,
    isOverdue: false,
  },
];

export const mockGoals: Goal[] = [
  {
    id: '1',
    title: 'Emergency Fund',
    targetAmount: 100000,
    currentAmount: 45000,
    deadline: new Date(2025, 6, 1),
    category: 'Emergency',
    progress: 45,
  },
  {
    id: '2',
    title: 'Vacation to Bali',
    targetAmount: 80000,
    currentAmount: 32000,
    deadline: new Date(2025, 11, 15),
    category: 'Travel',
    progress: 40,
  },
  {
    id: '3',
    title: 'New Laptop',
    targetAmount: 75000,
    currentAmount: 60000,
    deadline: new Date(2025, 3, 30),
    category: 'Technology',
    progress: 80,
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    amount: 65000,
    category: 'Salary',
    description: 'Monthly Salary',
    date: new Date(),
    type: 'income',
  },
  {
    id: '2',
    amount: 25000,
    category: 'Housing',
    description: 'Rent Payment',
    date: subDays(new Date(), 2),
    type: 'expense',
  },
  {
    id: '3',
    amount: 1200,
    category: 'Food',
    description: 'Groceries',
    date: subDays(new Date(), 1),
    type: 'expense',
  },
  {
    id: '4',
    amount: 5000,
    category: 'Savings',
    description: 'Monthly Savings',
    date: subDays(new Date(), 3),
    type: 'expense',
  },
];

export const mockFinancialSummary: FinancialSummary = {
  monthlyIncome: 65000,
  monthlyExpenses: 38500,
  totalSavings: 126500,
  expensesByCategory: [
    { category: 'Housing', amount: 25000, color: '#3B82F6' },
    { category: 'Food', amount: 8000, color: '#10B981' },
    { category: 'Transportation', amount: 3500, color: '#8B5CF6' },
    { category: 'Utilities', amount: 2000, color: '#F59E0B' },
  ],
  monthlyTrend: [
    { month: 'Sep', income: 62000, expenses: 35000 },
    { month: 'Oct', income: 64000, expenses: 37000 },
    { month: 'Nov', income: 63000, expenses: 36500 },
    { month: 'Dec', income: 65000, expenses: 38500 },
    { month: 'Jan', income: 65000, expenses: 35000 },
  ],
};