import { motion } from 'framer-motion';

export const Header = () => {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-100 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              FinCoach
            </span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
              Features
            </a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
              Contact
            </a>
          </nav>

          <div className="flex space-x-3">
            <section>COMING SOON</section>
          </div>
        </div>
      </div>
    </motion.header>
  );
};