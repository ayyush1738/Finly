import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { 
  Bell, 
  Mail, 
  Smartphone, 
  Calendar, 
  Clock,
  Plus,
  Settings
} from 'lucide-react';

interface Reminder {
  id: string;
  billName: string;
  type: 'email' | 'push' | 'both';
  daysBefore: number;
  isActive: boolean;
}

const mockReminders: Reminder[] = [
  {
    id: '1',
    billName: 'Rent',
    type: 'email',
    daysBefore: 3,
    isActive: true,
  },
  {
    id: '2',
    billName: 'Electricity Bill',
    type: 'both',
    daysBefore: 5,
    isActive: true,
  },
  {
    id: '3',
    billName: 'Internet',
    type: 'push',
    daysBefore: 1,
    isActive: false,
  },
];

export const RemindersTab: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>(mockReminders);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReminder, setNewReminder] = useState({
    billName: '',
    type: 'email' as 'email' | 'push' | 'both',
    daysBefore: 3,
  });

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    const reminder: Reminder = {
      id: Date.now().toString(),
      ...newReminder,
      isActive: true,
    };
    setReminders([...reminders, reminder]);
    setNewReminder({ billName: '', type: 'email', daysBefore: 3 });
    setShowAddForm(false);
  };

  const toggleReminder = (reminderId: string) => {
    setReminders(reminders.map(reminder =>
      reminder.id === reminderId 
        ? { ...reminder, isActive: !reminder.isActive }
        : reminder
    ));
  };

  const deleteReminder = (reminderId: string) => {
    setReminders(reminders.filter(reminder => reminder.id !== reminderId));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return Mail;
      case 'push': return Smartphone;
      case 'both': return Bell;
      default: return Bell;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'email': return 'text-blue-600 bg-blue-50';
      case 'push': return 'text-purple-600 bg-purple-50';
      case 'both': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Bill Reminders</h2>
          <p className="text-gray-600 mt-1">
            Never miss a payment with automated reminders
          </p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="h-5 w-5 mr-2" />
          Add Reminder
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-green-50 p-3 rounded-full">
                <Bell className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Active Reminders</h3>
                <p className="text-2xl font-bold text-green-600">
                  {reminders.filter(r => r.isActive).length}
                </p>
                <p className="text-sm text-gray-500">Currently enabled</p>
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
              <div className="bg-blue-50 p-3 rounded-full">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Email Reminders</h3>
                <p className="text-2xl font-bold text-blue-600">
                  {reminders.filter(r => r.type === 'email' || r.type === 'both').length}
                </p>
                <p className="text-sm text-gray-500">Via email</p>
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
                <Smartphone className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Push Notifications</h3>
                <p className="text-2xl font-bold text-purple-600">
                  {reminders.filter(r => r.type === 'push' || r.type === 'both').length}
                </p>
                <p className="text-sm text-gray-500">Mobile alerts</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Add Reminder Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6">
            <form onSubmit={handleAddReminder} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Bill Name"
                  value={newReminder.billName}
                  onChange={(e) => setNewReminder({ ...newReminder, billName: e.target.value })}
                  placeholder="e.g., Electricity Bill"
                  required
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reminder Type
                  </label>
                  <select
                    value={newReminder.type}
                    onChange={(e) => setNewReminder({ ...newReminder, type: e.target.value as any })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="email">Email Only</option>
                    <option value="push">Push Notification</option>
                    <option value="both">Email + Push</option>
                  </select>
                </div>

                <Input
                  label="Days Before Due"
                  type="number"
                  value={newReminder.daysBefore}
                  onChange={(e) => setNewReminder({ ...newReminder, daysBefore: parseInt(e.target.value) })}
                  min="1"
                  max="30"
                  required
                />
              </div>
              
              <div className="flex space-x-3">
                <Button type="submit">Add Reminder</Button>
                <Button variant="ghost" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      )}

      {/* Reminders List */}
      <div className="space-y-4">
        {reminders.map((reminder, index) => {
          const TypeIcon = getTypeIcon(reminder.type);
          const typeColor = getTypeColor(reminder.type);

          return (
            <motion.div
              key={reminder.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${typeColor}`}>
                      <TypeIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{reminder.billName}</h3>
                      <p className="text-sm text-gray-500">
                        {reminder.daysBefore} days before due • {reminder.type.replace('both', 'Email + Push')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Active</span>
                      <button
                        onClick={() => toggleReminder(reminder.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          reminder.isActive ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            reminder.isActive ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => deleteReminder(reminder.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};