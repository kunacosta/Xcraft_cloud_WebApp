
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Trade } from '@/types/trade';
import { useToast } from '@/components/ui/use-toast';

interface TradeContextType {
  trades: Trade[];
  addTrade: (trade: Omit<Trade, 'id' | 'date'>) => void;
  editTrade: (id: string, trade: Partial<Trade>) => void;
  deleteTrade: (id: string) => void;
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

  useEffect(() => {
    // Load trades from localStorage
    const storedTrades = localStorage.getItem('xcraft-trades');
    if (storedTrades) {
      try {
        setTrades(JSON.parse(storedTrades));
      } catch (error) {
        console.error('Failed to parse trades from localStorage', error);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // Save trades to localStorage whenever they change
    if (!loading) {
      localStorage.setItem('xcraft-trades', JSON.stringify(trades));
    }
  }, [trades, loading]);

  const addTrade = (newTrade: Omit<Trade, 'id' | 'date'>) => {
    const trade: Trade = {
      ...newTrade,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    
    setTrades((prevTrades) => [trade, ...prevTrades]);
    
    toast({
      title: 'Trade Added',
      description: `${newTrade.tradeType.toUpperCase()} ${newTrade.currencyPair} successfully recorded`,
    });
  };

  const editTrade = (id: string, updatedTrade: Partial<Trade>) => {
    setTrades((prevTrades) =>
      prevTrades.map((trade) =>
        trade.id === id ? { ...trade, ...updatedTrade } : trade
      )
    );
    
    toast({
      title: 'Trade Updated',
      description: 'Trade details have been updated successfully',
    });
  };

  const deleteTrade = (id: string) => {
    setTrades((prevTrades) => prevTrades.filter((trade) => trade.id !== id));
    
    toast({
      title: 'Trade Deleted',
      description: 'Trade has been removed from your journal',
    });
  };

  return (
    <TradeContext.Provider value={{ trades, addTrade, editTrade, deleteTrade, loading }}>
      {children}
    </TradeContext.Provider>
  );
};
