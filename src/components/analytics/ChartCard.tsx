
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
    <Card className={`chart-card border border-gray-100 ${className}`}>
      <CardHeader className="bg-gradient-to-r from-blue-50 to-white pb-3 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-medium text-gray-800">{title}</CardTitle>
          <CardDescription className="text-gray-500">{description}</CardDescription>
        </div>
        <div className="p-2 bg-blue-100 rounded-full">
          <Icon className="h-5 w-5 text-blue-500" />
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {children}
      </CardContent>
    </Card>
  );
};

export default ChartCard;
