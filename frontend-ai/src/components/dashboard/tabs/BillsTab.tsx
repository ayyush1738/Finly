import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { 
  Plus, 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Edit2,
  Trash2 
} from 'lucide-react';
import { Bill } from '../../../types';
import { mockBills } from '../../../data/mockData';
import { format, isAfter, isBefore, addDays } from 'date-fns';
import { clsx } from 'clsx';

export const BillsTab: React.FC = () => {
  const [bills, setBills] = useState<Bill[]>(mockBills);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBill, setNewBill] = useState({
    name: '',
    amount: '',
    dueDate: '',
    category: '',
  });

  const handleAddBill = (e: React.FormEvent) => {
    e.preventDefault();
    const bill: Bill = {
      id: Date.now().toString(),
      name: newBill.name,
      amount: parseFloat(newBill.amount),
      dueDate: new Date(newBill.dueDate),
      category: newBill.category,
      isRecurring: true,
      isPaid: false,
      isOverdue: false,
    };
    setBills([...bills, bill]);
    setNewBill({ name: '', amount: '', dueDate: '', category: '' });
    setShowAddForm(false);
  };

  const togglePaid = (billId: string) => {
    setBills(bills.map(bill => 
      bill.id === billId ? { ...bill, isPaid: !bill.isPaid } : bill
    ));
  };

  const deleteBill = (billId: string) => {
    setBills(bills.filter(bill => bill.id !== billId));
  };

  const getBillStatus = (bill: Bill) => {
    const today = new Date();
    const dueDate = new Date(bill.dueDate);
    
    if (bill.isPaid) return 'paid';
    if (isBefore(dueDate, today)) return 'overdue';
    if (isBefore(dueDate, addDays(today, 3))) return 'due-soon';
    return 'upcoming';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-green-600 bg-green-50';
      case 'overdue': return 'text-red-600 bg-red-50';
      case 'due-soon': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-blue-600 bg-blue-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return CheckCircle;
      case 'overdue': return AlertTriangle;
      case 'due-soon': return Clock;
      default: return Calendar;
    }
  };

  const totalAmount = bills.reduce((sum, bill) => sum + bill.amount, 0);
  const unpaidAmount = bills.filter(bill => !bill.isPaid).reduce((sum, bill) => sum + bill.amount, 0);
  const overdueBills = bills.filter(bill => getBillStatus(bill) === 'overdue');

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
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Total Bills</h3>
                <p className="text-2xl font-bold text-blue-600">₹{totalAmount.toLocaleString()}</p>
                <p className="text-sm text-gray-500">{bills.length} bills this month</p>
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
              <div className="bg-yellow-50 p-3 rounded-full">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Unpaid</h3>
                <p className="text-2xl font-bold text-yellow-600">₹{unpaidAmount.toLocaleString()}</p>
                <p className="text-sm text-gray-500">Requires payment</p>
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
              <div className="bg-red-50 p-3 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Overdue</h3>
                <p className="text-2xl font-bold text-red-600">{overdueBills.length}</p>
                <p className="text-sm text-gray-500">Need immediate attention</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Add Bill Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Your Bills</h2>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="h-5 w-5 mr-2" />
          Add Bill
        </Button>
      </div>

      {/* Add Bill Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6">
            <form onSubmit={handleAddBill} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                label="Bill Name"
                value={newBill.name}
                onChange={(e) => setNewBill({ ...newBill, name: e.target.value })}
                placeholder="e.g., Electricity Bill"
                required
              />
              <Input
                label="Amount (₹)"
                type="number"
                value={newBill.amount}
                onChange={(e) => setNewBill({ ...newBill, amount: e.target.value })}
                placeholder="0"
                required
              />
              <Input
                label="Due Date"
                type="date"
                value={newBill.dueDate}
                onChange={(e) => setNewBill({ ...newBill, dueDate: e.target.value })}
                required
              />
              <Input
                label="Category"
                value={newBill.category}
                onChange={(e) => setNewBill({ ...newBill, category: e.target.value })}
                placeholder="e.g., Utilities"
                required
              />
              <div className="md:col-span-4 flex space-x-3">
                <Button type="submit">Add Bill</Button>
                <Button variant="ghost" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      )}

      {/* Bills List */}
      <div className="space-y-4">
        {bills.map((bill, index) => {
          const status = getBillStatus(bill);
          const StatusIcon = getStatusIcon(status);
          const statusColor = getStatusColor(status);

          return (
            <motion.div
              key={bill.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={clsx('p-2 rounded-full', statusColor)}>
                      <StatusIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{bill.name}</h3>
                      <p className="text-sm text-gray-500">
                        {bill.category} • Due {format(new Date(bill.dueDate), 'MMM dd, yyyy')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        ₹{bill.amount.toLocaleString()}
                      </p>
                      <span className={clsx('text-xs px-2 py-1 rounded-full capitalize', statusColor)}>
                        {status.replace('-', ' ')}
                      </span>
                    </div>

                    <div className="flex space-x-2">
                      {!bill.isPaid && (
                        <Button
                          size="sm"
                          onClick={() => togglePaid(bill.id)}
                        >
                          Mark Paid
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => deleteBill(bill.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
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