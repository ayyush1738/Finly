import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { 
  Target, 
  Plus, 
  TrendingUp,
  Calendar,
  Edit2,
  Trash2,
  Award
} from 'lucide-react';
import { Goal } from '../../../types';
import { mockGoals } from '../../../data/mockData';
import { format } from 'date-fns';
import { clsx } from 'clsx';

export const GoalsTab: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    targetAmount: '',
    currentAmount: '',
    deadline: '',
    category: '',
  });

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      targetAmount: parseFloat(newGoal.targetAmount),
      currentAmount: parseFloat(newGoal.currentAmount) || 0,
      deadline: new Date(newGoal.deadline),
      category: newGoal.category,
      progress: (parseFloat(newGoal.currentAmount) || 0) / parseFloat(newGoal.targetAmount) * 100,
    };
    setGoals([...goals, goal]);
    setNewGoal({ title: '', targetAmount: '', currentAmount: '', deadline: '', category: '' });
    setShowAddForm(false);
  };

  const updateGoalProgress = (goalId: string, amount: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const newAmount = Math.min(goal.currentAmount + amount, goal.targetAmount);
        const newProgress = (newAmount / goal.targetAmount) * 100;
        return { ...goal, currentAmount: newAmount, progress: newProgress };
      }
      return goal;
    }));
  };

  const deleteGoal = (goalId: string) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 100) return 'bg-green-500';
    if (progress >= 75) return 'bg-blue-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const totalTargetAmount = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalCurrentAmount = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const completedGoals = goals.filter(goal => goal.progress >= 100).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-50 p-3 rounded-full">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Total Goals</h3>
                <p className="text-2xl font-bold text-blue-600">₹{totalTargetAmount.toLocaleString()}</p>
                <p className="text-sm text-gray-500">{goals.length} active goals</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-green-50 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Total Saved</h3>
                <p className="text-2xl font-bold text-green-600">₹{totalCurrentAmount.toLocaleString()}</p>
                <p className="text-sm text-gray-500">
                  {((totalCurrentAmount / totalTargetAmount) * 100).toFixed(1)}% of target
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-50 p-3 rounded-full">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Completed</h3>
                <p className="text-2xl font-bold text-purple-600">{completedGoals}</p>
                <p className="text-sm text-gray-500">Goals achieved</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Financial Goals</h2>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="h-5 w-5 mr-2" />
          Add Goal
        </Button>
      </div>

      {/* Add Goal Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6">
            <form onSubmit={handleAddGoal} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <Input
                  label="Goal Title"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  placeholder="e.g., Emergency Fund"
                  required
                />
                
                <Input
                  label="Target Amount (₹)"
                  type="number"
                  value={newGoal.targetAmount}
                  onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
                  placeholder="100000"
                  required
                />
                
                <Input
                  label="Current Amount (₹)"
                  type="number"
                  value={newGoal.currentAmount}
                  onChange={(e) => setNewGoal({ ...newGoal, currentAmount: e.target.value })}
                  placeholder="0"
                />
                
                <Input
                  label="Deadline"
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                  required
                />
                
                <Input
                  label="Category"
                  value={newGoal.category}
                  onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                  placeholder="e.g., Emergency"
                  required
                />
              </div>
              
              <div className="flex space-x-3">
                <Button type="submit">Add Goal</Button>
                <Button variant="ghost" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      )}

      {/* Goals List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {goals.map((goal, index) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
                    <p className="text-sm text-gray-500">
                      {goal.category} • Due {format(new Date(goal.deadline), 'MMM dd, yyyy')}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => deleteGoal(goal.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{goal.progress.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={clsx('h-3 rounded-full transition-all duration-300', getProgressColor(goal.progress))}
                      style={{ width: `${Math.min(goal.progress, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">
                      ₹{goal.currentAmount.toLocaleString()} of ₹{goal.targetAmount.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      ₹{(goal.targetAmount - goal.currentAmount).toLocaleString()} remaining
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      onClick={() => updateGoalProgress(goal.id, 1000)}
                    >
                      Add ₹1k
                    </Button>
                    <Button 
                      size="sm" 
                      variant="secondary"
                      onClick={() => updateGoalProgress(goal.id, 5000)}
                    >
                      Add ₹5k
                    </Button>
                  </div>
                </div>

                {goal.progress >= 100 && (
                  <div className="flex items-center space-x-2 bg-green-50 p-3 rounded-lg">
                    <Award className="h-5 w-5 text-green-600" />
                    <span className="text-green-700 font-medium">Goal Achieved! 🎉</span>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};