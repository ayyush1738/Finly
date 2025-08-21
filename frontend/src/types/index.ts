export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
}

export interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: Date;
  category: string;
  isRecurring: boolean;
  isPaid: boolean;
  isOverdue: boolean;
}

export interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  category: string;
  progress: number;
}

export interface Transaction {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: Date;
  type: 'income' | 'expense';
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface FinancialSummary {
  monthlyIncome: number;
  monthlyExpenses: number;
  totalSavings: number;
  expensesByCategory: { category: string; amount: number; color: string }[];
  monthlyTrend: { month: string; income: number; expenses: number }[];
}