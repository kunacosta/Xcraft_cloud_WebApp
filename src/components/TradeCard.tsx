
import React from 'react';
import { Trade } from '@/types/trade';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { ArrowDown, ArrowUp, Edit, Trash, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { useTrades } from '@/context/TradeContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import TradeForm from './TradeForm';
import { tradingStrategies } from '@/types/trade';

interface TradeCardProps {
  trade: Trade;
}

const TradeCard: React.FC<TradeCardProps> = ({ trade }) => {
  const { deleteTrade } = useTrades();
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  
  const isProfitable = trade.profitLoss > 0;
  const formattedDate = formatDistanceToNow(new Date(trade.date), { addSuffix: true });
  
  // Get strategy label from value
  const getStrategyLabel = (value?: string): string => {
    if (!value) return '';
    const strategy = tradingStrategies.find(s => s.value === value);
    return strategy ? strategy.label : value;
  };
  
  return (
    <>
      <Card className={cn(
        "overflow-hidden card-hover-effect bg-black/30 backdrop-blur-sm border border-xcraft-accent/10",
        isProfitable ? "border-l-green-500" : "border-l-red-500",
        "border-l-4"
      )}>
        <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between bg-black/20">
          <div className="flex items-center">
            <span className="text-lg font-montserrat font-bold">{trade.currencyPair}</span>
            <span className={cn(
              "ml-2 text-xs font-medium px-2 py-0.5 rounded-full",
              trade.tradeType === 'buy' ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
            )}>
              {trade.tradeType === 'buy' ? 'BUY' : 'SELL'}
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            {formattedDate}
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-3">
          <div className="flex justify-between mb-2">
            <div className="text-sm">
              <span className="text-muted-foreground">Entry:</span> {trade.entryPrice.toFixed(5)}
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Exit:</span> {trade.exitPrice.toFixed(5)}
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Lot Size:</span> {trade.lotSize}
            </div>
          </div>
          
          {trade.strategy && (
            <div className="mt-2 mb-2 flex items-center">
              <Tag className="h-3 w-3 mr-1 text-blue-400" />
              <span className="text-xs text-blue-400 font-medium">
                {getStrategyLabel(trade.strategy)}
              </span>
            </div>
          )}
          
          {trade.notes && (
            <div className="mt-2 text-sm">
              <div className="text-muted-foreground font-medium mb-1">Notes:</div>
              <p className="text-sm">{trade.notes}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="p-4 flex justify-between bg-black/10">
          <div className="flex items-center">
            {isProfitable ? 
              <ArrowUp className="h-4 w-4 text-green-500 mr-1" /> : 
              <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
            }
            <span className={cn(
              "font-medium",
              isProfitable ? "text-green-500" : "text-red-500"
            )}>
              {isProfitable ? "+" : ""}{trade.profitLoss.toFixed(2)} pips
            </span>
          </div>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="h-8 px-2 border-xcraft-accent/20 hover:bg-xcraft-accent/10"
              onClick={() => setIsEditDialogOpen(true)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" variant="outline" className="h-8 px-2 border-red-500/20 hover:bg-red-500/10">
                  <Trash className="h-4 w-4 text-red-500" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Trade</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this trade record? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={() => deleteTrade(trade.id)}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardFooter>
      </Card>
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Trade</DialogTitle>
          </DialogHeader>
          <TradeForm 
            initialData={trade} 
            mode="edit" 
            onSuccess={() => setIsEditDialogOpen(false)} 
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TradeCard;
