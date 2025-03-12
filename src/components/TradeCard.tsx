
import React from 'react';
import { Trade } from '@/types/trade';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useTrades } from '@/context/TradeContext';
import { 
  CardHeader,
  TradeDetails,
  ProfitLossIndicator,
  CardActions,
  EditTradeDialog
} from './trade-card';

interface TradeCardProps {
  trade: Trade;
}

const TradeCard: React.FC<TradeCardProps> = ({ trade }) => {
  const { deleteTrade } = useTrades();
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  
  const isProfitable = trade.profitLoss > 0;
  
  return (
    <>
      <Card className={cn(
        "overflow-hidden card-hover-effect shadow-card",
        "bg-white border border-xcraft-accent/10",
        isProfitable ? "border-l-green-500" : "border-l-red-500",
        "border-l-4"
      )}>
        <CardHeader trade={trade} />
        
        <CardContent className="p-4 pt-3">
          <TradeDetails trade={trade} />
        </CardContent>
        
        <CardFooter className="p-4 flex justify-between bg-gray-50">
          <ProfitLossIndicator 
            profitLoss={trade.profitLoss} 
            amount={trade.amount || 0} 
          />
          <CardActions 
            onEdit={() => setIsEditDialogOpen(true)} 
            onDelete={() => deleteTrade(trade.id)} 
          />
        </CardFooter>
      </Card>
      
      <EditTradeDialog 
        trade={trade} 
        isOpen={isEditDialogOpen} 
        onOpenChange={setIsEditDialogOpen} 
      />
    </>
  );
};

export default TradeCard;

