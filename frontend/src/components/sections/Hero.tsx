import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { TrendingUp, Shield, Zap, Target } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
              Your AI coach for{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                smarter money
              </span>{' '}
              habits
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              This is just an MVP to show the idea & offered features, we have much more beyind this to show.
            </p>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Shipping it soon!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button size="lg" className="w-full sm:w-auto">
              Coming Soon
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16"
          >
            <div className="flex flex-col items-center space-y-3">
              <div className="bg-blue-100 p-4 rounded-full">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Bank-Level Security</h3>
              <p className="text-gray-600 text-center">Your data is encrypted and protected with industry-leading security standards.</p>
            </div>
            
            <div className="flex flex-col items-center space-y-3">
              <div className="bg-green-100 p-4 rounded-full">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Instant Insights</h3>
              <p className="text-gray-600 text-center">Get real-time analysis of your spending patterns and financial health.</p>
            </div>
            
            <div className="flex flex-col items-center space-y-3">
              <div className="bg-purple-100 p-4 rounded-full">
                <Target className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Goal Tracking</h3>
              <p className="text-gray-600 text-center">Set and achieve your financial goals with personalized recommendations.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};