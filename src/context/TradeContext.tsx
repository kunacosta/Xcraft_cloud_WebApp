
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Trade, TradeInsert, TradeUpdate } from '@/types/trade';
import { useToast } from '@/components/ui/use-toast';
import { 
  fetchTrades as fetchTradesService,
  addTradeToSupabase,
  editTradeInSupabase,
  deleteTradeFromSupabase
} from '@/services/tradeService';

interface TradeContextType {
  trades: Trade[];
  addTrade: (trade: TradeInsert) => Promise<void>;
  editTrade: (id: string, trade: TradeUpdate) => Promise<void>;
  deleteTrade: (id: string) => Promise<void>;
  loading: boolean;
}

const TradeContext = createContext<TradeContextType | undefined>(undefined);

export const useTrades = () => {
  const context = useContext(TradeContext);
  if (!context) {
    throw new Error('useTrades must be used within a TradeProvider');
  }
  return context;
};

export const TradeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch trades from Supabase
  const fetchTrades = async () => {
    try {
      setLoading(true);
      const formattedTrades = await fetchTradesService();
      setTrades(formattedTrades);
    } catch (error) {
      console.error('Error fetching trades:', error);
      toast({
        title: 'Error loading trades',
        description: 'Could not load your trades from the database',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrades();
  }, []);

  const addTrade = async (newTrade: TradeInsert) => {
    try {
      const trade = await addTradeToSupabase(newTrade);
      setTrades((prevTrades) => [trade, ...prevTrades]);
      
      toast({
        title: 'Trade Added',
        description: `${newTrade.tradeType.toUpperCase()} ${newTrade.currencyPair} successfully recorded`,
      });
    } catch (error) {
      console.error('Error adding trade:', error);
      toast({
        title: 'Error Adding Trade',
        description: 'Your trade could not be saved to the database',
        variant: 'destructive',
      });
    }
  };

  const editTrade = async (id: string, updatedTrade: TradeUpdate) => {
    try {
      await editTradeInSupabase(id, updatedTrade);
      
      // Update local state
      setTrades((prevTrades) =>
        prevTrades.map((trade) =>
          trade.id === id ? { ...trade, ...updatedTrade } : trade
        )
      );
      
      toast({
        title: 'Trade Updated',
        description: 'Trade details have been updated successfully',
      });
    } catch (error) {
      console.error('Error updating trade:', error);
      toast({
        title: 'Error Updating Trade',
        description: 'Your trade could not be updated in the database',
        variant: 'destructive',
      });
    }
  };

  const deleteTrade = async (id: string) => {
    try {
      await deleteTradeFromSupabase(id);
      
      // Update local state
      setTrades((prevTrades) => prevTrades.filter((trade) => trade.id !== id));
      
      toast({
        title: 'Trade Deleted',
        description: 'Trade has been removed from your journal',
      });
    } catch (error) {
      console.error('Error deleting trade:', error);
      toast({
        title: 'Error Deleting Trade',
        description: 'Your trade could not be deleted from the database',
        variant: 'destructive',
      });
    }
  };

  return (
    <TradeContext.Provider value={{ trades, addTrade, editTrade, deleteTrade, loading }}>
      {children}
    </TradeContext.Provider>
  );
};
