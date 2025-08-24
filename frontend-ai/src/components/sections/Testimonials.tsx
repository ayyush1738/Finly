import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Marketing Manager',
    content: 'Finly helped me save ₹50,000 in just 6 months by identifying unnecessary expenses I never noticed. The AI insights are incredibly accurate.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=100&h=100&fit=crop&crop=face',
  },
  {
    name: 'Rajesh Kumar',
    role: 'Software Engineer',
    content: 'The bill reminders feature is a game-changer. I never miss payments anymore, and my credit score has improved significantly.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?w=100&h=100&fit=crop&crop=face',
  },
  {
    name: 'Priya Sharma',
    role: 'Business Owner',
    content: 'The AI coach provides personalized advice that actually makes sense. Its like having a financial advisor in my pocket 24/7.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?w=100&h=100&fit=crop&crop=face',
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-6 mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Trusted by{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              10,000+ Users
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See what our users say about their financial transformation with Finly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card hover className="p-8 h-full">
                <div className="space-y-6">
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="text-gray-700 leading-relaxed">
                    "{testimonial.content}"
                  </blockquote>
                  
                  <div className="flex items-center space-x-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-gray-600 text-sm">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">10K+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-600">₹2.5Cr+</div>
              <div className="text-gray-600">Money Saved</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-600">98%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-orange-600">4.9/5</div>
              <div className="text-gray-600">App Rating</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};