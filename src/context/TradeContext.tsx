
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Trade, TradeInsert, TradeUpdate } from '@/types/trade';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from "@/integrations/supabase/client";

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
      
      const { data, error } = await supabase
        .from('trades')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      // Map Supabase data to our Trade interface
      const formattedTrades: Trade[] = data.map(trade => ({
        id: trade.id,
        currencyPair: trade.pair,
        entryPrice: trade.entry_price,
        exitPrice: trade.exit_price,
        tradeType: trade.type as TradeType,
        profitLoss: trade.profit,
        notes: trade.notes || '',
        date: trade.date,
        lotSize: trade.quantity || 1,
      }));
      
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
      const { profitLoss, currencyPair, tradeType, entryPrice, exitPrice, lotSize, notes } = newTrade;
      
      // Insert into Supabase
      const { data, error } = await supabase
        .from('trades')
        .insert({
          pair: currencyPair,
          type: tradeType,
          entry_price: entryPrice,
          exit_price: exitPrice,
          quantity: lotSize,
          profit: profitLoss,
          notes: notes,
          date: new Date().toISOString(),
        })
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      // Format the returned data to match our Trade interface
      const trade: Trade = {
        id: data.id,
        currencyPair: data.pair,
        entryPrice: data.entry_price,
        exitPrice: data.exit_price,
        tradeType: data.type as TradeType,
        profitLoss: data.profit,
        notes: data.notes || '',
        date: data.date,
        lotSize: data.quantity || 1,
      };
      
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
      // Prepare update data for Supabase
      const updateData: any = {};
      
      if (updatedTrade.currencyPair) updateData.pair = updatedTrade.currencyPair;
      if (updatedTrade.tradeType) updateData.type = updatedTrade.tradeType;
      if (updatedTrade.entryPrice !== undefined) updateData.entry_price = updatedTrade.entryPrice;
      if (updatedTrade.exitPrice !== undefined) updateData.exit_price = updatedTrade.exitPrice;
      if (updatedTrade.lotSize !== undefined) updateData.quantity = updatedTrade.lotSize;
      if (updatedTrade.profitLoss !== undefined) updateData.profit = updatedTrade.profitLoss;
      if (updatedTrade.notes !== undefined) updateData.notes = updatedTrade.notes;
      
      // Update in Supabase
      const { error } = await supabase
        .from('trades')
        .update(updateData)
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
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
      // Delete from Supabase
      const { error } = await supabase
        .from('trades')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
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
