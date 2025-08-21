import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User,
  TrendingUp,
  AlertTriangle,
  Target,
  DollarSign
} from 'lucide-react';
import { ChatMessage } from '../../../types';
import { format } from 'date-fns';

const initialMessages: ChatMessage[] = [
  {
    id: '1',
    content: 'Hello! I\'m your AI financial coach. I can help you understand your spending patterns, track your goals, and provide personalized advice. What would you like to know about your finances?',
    sender: 'ai',
    timestamp: new Date(),
  },
];

const quickQuestions = [
  'Why did I overspend last month?',
  'Remind me of bills due this week',
  'How close am I to my savings goal?',
  'Show me my biggest expenses',
  'Give me budget recommendations',
  'What bills are overdue?',
];

export const AIInsightsTab: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('overspend') || message.includes('spending')) {
      return 'Based on your spending data, you overspent by ₹3,500 last month primarily due to increased dining out (₹2,100) and online shopping (₹1,400). I recommend setting a monthly limit for these categories. Would you like me to create spending alerts for you?';
    }
    
    if (message.includes('bills due') || message.includes('due this week')) {
      return 'You have 2 bills due this week: Electricity Bill (₹2,500) due in 3 days, and Phone Bill (₹800) due in 5 days. Your Internet bill is already 2 days overdue (₹1,200). Shall I send you payment reminders?';
    }
    
    if (message.includes('savings goal') || message.includes('goals')) {
      return 'Great question! You\'re making excellent progress on your goals:\n\n• Emergency Fund: 45% complete (₹45,000/₹100,000)\n• Vacation to Bali: 40% complete (₹32,000/₹80,000)\n• New Laptop: 80% complete (₹60,000/₹75,000)\n\nYou\'re closest to achieving your laptop goal! Consider allocating ₹5,000 more this month to complete it.';
    }
    
    if (message.includes('biggest expenses') || message.includes('expenses')) {
      return 'Your top spending categories this month are:\n\n1. Housing: ₹25,000 (65% of expenses)\n2. Food & Dining: ₹8,000 (21% of expenses)\n3. Transportation: ₹3,500 (9% of expenses)\n4. Utilities: ₹2,000 (5% of expenses)\n\nYour housing costs are within the recommended 30% of income, but consider reducing dining expenses to boost savings.';
    }
    
    if (message.includes('budget') || message.includes('recommendations')) {
      return 'Based on your income of ₹65,000, here\'s my recommended budget:\n\n• Housing: ₹19,500 (30%)\n• Food: ₹6,500 (10%)\n• Transportation: ₹3,250 (5%)\n• Savings: ₹13,000 (20%)\n• Other: ₹22,750 (35%)\n\nYou\'re currently overspending on housing by ₹5,500. Consider finding ways to reduce this cost.';
    }
    
    if (message.includes('overdue') || message.includes('missed')) {
      return 'You have 1 overdue bill: Internet bill of ₹1,200 was due 2 days ago. This could affect your credit score if not paid soon. I recommend paying it immediately and setting up automatic payments to avoid future missed deadlines.';
    }
    
    return 'I\'m here to help with your financial questions! You can ask me about your spending patterns, bill reminders, savings goals, budget recommendations, or any other money-related topics. What specific area would you like to focus on?';
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(message),
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Insights Summary */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Insights</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-red-50 p-2 rounded-full">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">1 Overdue Bill</p>
                  <p className="text-gray-600">Internet ₹1,200</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-blue-50 p-2 rounded-full">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">Savings Rate</p>
                  <p className="text-gray-600">40.7% this month</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-green-50 p-2 rounded-full">
                  <Target className="h-4 w-4 text-green-600" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">Goal Progress</p>
                  <p className="text-gray-600">55% average</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-purple-50 p-2 rounded-full">
                  <DollarSign className="h-4 w-4 text-purple-600" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">Cash Flow</p>
                  <p className="text-gray-600">+₹26,500</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Questions</h3>
            <div className="space-y-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="w-full text-left text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-full">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">AI Financial Coach</h2>
                  <p className="text-gray-600">Your personal money management assistant</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex space-x-3 max-w-xs lg:max-w-md ${
                    message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}>
                    <div className={`p-2 rounded-full ${
                      message.sender === 'user' ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="h-5 w-5 text-blue-600" />
                      ) : (
                        <Bot className="h-5 w-5 text-gray-600" />
                      )}
                    </div>
                    <div className={`rounded-lg px-4 py-3 ${
                      message.sender === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                      <p className={`text-xs mt-2 ${
                        message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {format(message.timestamp, 'HH:mm')}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex space-x-3">
                    <div className="bg-gray-100 p-2 rounded-full">
                      <Bot className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="bg-gray-100 rounded-lg px-4 py-3">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Message Input */}
            <div className="p-6 border-t border-gray-200">
              <div className="flex space-x-4">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask me about your finances..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
                  className="flex-1"
                />
                <Button onClick={() => handleSendMessage(inputMessage)}>
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};