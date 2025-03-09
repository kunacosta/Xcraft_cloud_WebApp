
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  description: string;
  trend: 'positive' | 'negative' | 'neutral';
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, value, icon: Icon, description, trend 
}) => {
  return (
    <Card className="bg-white shadow-card border border-xcraft-accent/10">
      <CardHeader className="flex flex-row items-center justify-between pb-2 bg-gradient-to-r from-blue-50 to-white">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${
          trend === 'positive' ? 'text-green-500' : 
          trend === 'negative' ? 'text-red-500' : 
          'text-gray-500'
        }`} />
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${
          trend === 'positive' ? 'text-green-500' : 
          trend === 'negative' ? 'text-red-500' : 
          'text-gray-800'
        }`}>
          {value}
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default StatCard;
