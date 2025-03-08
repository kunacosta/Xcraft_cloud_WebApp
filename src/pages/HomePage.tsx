
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart2, Clock, LineChart, Shield, Sparkles, Rocket, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="py-16 md:py-24 container animate-fadeIn">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-6 w-6 text-blue-400" />
              <span className="text-blue-300 text-sm font-medium">Trading Journal</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
              Master Your <span className="text-blue-500">Forex</span> Trading Journey
            </h1>
            <p className="text-lg text-gray-300 md:w-4/5">
              Track, analyze, and improve your trading performance with our professional forex trading journal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" variant="primary-dark" asChild className="group">
                <Link to="/dashboard">
                  Get Started <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline-dark" asChild>
                <Link to="/log">
                  View Example Trades
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-700/20 rounded-full blur-3xl"></div>
            <div className="glassmorphism p-6 rounded-xl shadow-xl relative z-10 transform transition-all hover:scale-[1.01] duration-300">
              <img 
                src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80" 
                alt="Trading charts and data" 
                className="rounded-lg w-full h-auto object-cover shadow-lg"
              />
              <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-blue-600 to-blue-400 p-2 rounded-lg shadow-lg">
                <Star className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-black/40 backdrop-blur-sm">
        <div className="container">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-[1px] w-12 bg-blue-500/50"></div>
            <h2 className="text-3xl font-bold text-center">
              <span className="bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h2>
            <div className="h-[1px] w-12 bg-blue-500/50"></div>
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

      {/* CTA Section */}
      <section className="py-16 container">
        <div className="glassmorphism rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center p-2 bg-blue-900/50 rounded-full mb-6">
              <Rocket className="h-6 w-6 text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Ready to Elevate Your Trading?</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
              Join traders worldwide who are achieving consistent results with our professional trading journal.
            </p>
            <Button size="lg" variant="primary-dark" asChild className="group">
              <Link to="/dashboard">
                Start Tracking Your Trades <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
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
    <div className="card-blue rounded-xl p-6 card-hover-effect relative overflow-hidden group">
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

export default HomePage;
