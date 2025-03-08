
import React from 'react';
import { BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center animate-fadeIn">
      <div className="w-16 h-16 mb-4 rounded-full bg-xcraft-secondary/20 flex items-center justify-center">
        <BarChart2 className="h-8 w-8 text-xcraft-secondary" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-md mb-6">{description}</p>
      
      {action && (
        <Link to={action.href}>
          <Button className="bg-xcraft-secondary hover:bg-xcraft-secondary/90">
            {action.label}
          </Button>
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
