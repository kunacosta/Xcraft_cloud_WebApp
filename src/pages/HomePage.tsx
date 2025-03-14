import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, BarChart2, Clock, LineChart, 
  Shield, Zap, Sparkles, TrendingUp, Medal
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const HomePage = () => {
  // Get current year for copyright
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="py-20 animate-fadeIn">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold mb-4">
                Trading Journal & Analytics
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                Master Your <span className="gradient-text">Forex</span> Trading Journey
              </h1>
              <p className="text-lg text-gray-600 md:w-4/5">
                Track, analyze, and improve your trading performance with Xcraft's professional forex trading journal.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="rounded-full btn-gradient" asChild>
                  <Link to="/dashboard">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full" asChild>
                  <Link to="/log">
                    View Example Trades
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 mt-10 md:mt-0">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-100 rounded-3xl rotate-3 scale-105 opacity-50"></div>
                <div className="glass-effect p-6 rounded-2xl shadow-xl relative z-10">
                  <img 
                    src="/lovable-uploads/2312935f-deaa-4c75-9799-e7304efeeb32.png" 
                    alt="Xcraft Trading Charts" 
                    className="rounded-lg w-full h-auto object-contain shadow-lg"
                  />
                  <div className="absolute -bottom-5 -right-5 bg-white p-3 rounded-xl shadow-lg">
                    <TrendingUp className="h-10 w-10 text-green-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              <span className="gradient-text">Powerful Features</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to become a more consistent and disciplined trader
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<BarChart2 className="w-10 h-10 text-blue-500" />}
              title="Advanced Analytics"
              description="Gain insights from detailed performance metrics and visualization tools."
            />
            <FeatureCard 
              icon={<Clock className="w-10 h-10 text-blue-500" />}
              title="Trade History"
              description="Keep a comprehensive record of all your trading activities."
            />
            <FeatureCard 
              icon={<LineChart className="w-10 h-10 text-blue-500" />}
              title="Performance Tracking"
              description="Monitor your progress and identify areas for improvement."
            />
            <FeatureCard 
              icon={<Shield className="w-10 h-10 text-blue-500" />}
              title="Strategy Development"
              description="Document and refine your trading strategies based on results."
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <BenefitCard 
              icon={<Zap className="h-8 w-8 text-amber-500" />}
              title="Faster Growth"
              description="Identify patterns in your trading and learn from your mistakes faster."
            />
            <BenefitCard 
              icon={<Sparkles className="h-8 w-8 text-purple-500" />}
              title="Better Decisions"
              description="Make data-driven decisions based on your historical performance."
            />
            <BenefitCard 
              icon={<Medal className="h-8 w-8 text-blue-500" />}
              title="Trading Excellence"
              description="Develop discipline and consistency through methodical tracking."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 container">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="hero-pattern absolute inset-0 opacity-50"></div>
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Ready to Elevate Your Trading?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Join traders worldwide who are achieving consistent results with Xcraft's trading journal.
            </p>
            <Button size="lg" className="rounded-full btn-gradient" asChild>
              <Link to="/dashboard">
                Start Tracking Your Trades <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm">
        <p>© {currentYear} Xcraft Trading Journal. All rights reserved.</p>
        <p className="mt-2">Your data is stored locally in your browser.</p>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 feature-card">
      <div className="bg-blue-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BenefitCard = ({ icon, title, description }: BenefitCardProps) => {
  return (
    <div className="flex flex-col items-center text-center p-6 animate-slideIn" style={{ animationDelay: '0.2s' }}>
      <div className="mb-4 p-3 rounded-full bg-gray-50 shadow-sm">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default HomePage;
