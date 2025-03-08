
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ChartCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  children: React.ReactNode;
  className?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  children,
  className = "" 
}) => {
  return (
    <Card className={`chart-card border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}>
      <CardHeader className="bg-gradient-to-r from-blue-50 to-white pb-3 flex flex-row items-center justify-between border-b border-gray-100">
        <div>
          <CardTitle className="text-lg font-medium text-gray-800">{title}</CardTitle>
          <CardDescription className="text-gray-500 mt-1">{description}</CardDescription>
        </div>
        <div className="p-3 bg-blue-100 rounded-full shadow-sm hover:bg-blue-200 transition-colors">
          <Icon className="h-5 w-5 text-[#003366]" />
        </div>
      </CardHeader>
      <CardContent className="pt-6 pb-4">
        {children}
      </CardContent>
    </Card>
  );
};

export default ChartCard;
