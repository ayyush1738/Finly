import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Bell, TrendingUp, Target, MessageCircle, Calendar, PieChart } from 'lucide-react';

const features = [
  {
    icon: Bell,
    title: 'Bill Reminders',
    description: 'Never miss a payment with smart notifications and automated reminders for all your bills.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: PieChart,
    title: 'Smart Spending Insights',
    description: 'Understand your spending patterns with AI-powered analytics and personalized recommendations.',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: Target,
    title: 'Savings Goals',
    description: 'Set and track financial goals with visual progress indicators and milestone celebrations.',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: MessageCircle,
    title: 'AI Financial Coach',
    description: 'Get personalized financial advice and answers to your money questions 24/7.',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    icon: Calendar,
    title: 'Financial Planning',
    description: 'Plan your financial future with predictive insights and budgeting tools.',
    color: 'bg-pink-100 text-pink-600',
  },
  {
    icon: TrendingUp,
    title: 'Investment Tracking',
    description: 'Monitor your investments and get recommendations for portfolio optimization.',
    color: 'bg-indigo-100 text-indigo-600',
  },
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-6 mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Powerful Features for{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Financial Success
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to take control of your finances, make smarter decisions, 
            and achieve your financial goals faster.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card hover className="p-8 h-full">
                  <div className="space-y-4">
                    <div className={`inline-flex p-3 rounded-lg ${feature.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};