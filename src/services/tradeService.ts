
import { supabase } from "@/integrations/supabase/client";
import { Trade, TradeInsert, TradeUpdate, TradeType } from '@/types/trade';

// Fetches all trades from Supabase for the current user
export const fetchTrades = async (): Promise<Trade[]> => {
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
    strategy: trade.strategy || '',
    user_id: trade.user_id
  }));
  
  return formattedTrades;
};

// Add a new trade to Supabase
export const addTradeToSupabase = async (newTrade: TradeInsert): Promise<Trade> => {
  const { profitLoss, currencyPair, tradeType, entryPrice, exitPrice, lotSize, notes, strategy, date } = newTrade;
  
  // Get the current user
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("User not authenticated");
  }
  
  // Format the date to ISO string if it's a Date object
  const formattedDate = date instanceof Date ? date.toISOString() : date;
  
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
      strategy: strategy || null,
      date: formattedDate,
      user_id: user.id
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
    strategy: data.strategy || '',
    user_id: data.user_id
  };
  
  return trade;
};

// Update an existing trade in Supabase
export const editTradeInSupabase = async (id: string, updatedTrade: TradeUpdate): Promise<void> => {
  // Prepare update data for Supabase
  const updateData: any = {};
  
  if (updatedTrade.currencyPair) updateData.pair = updatedTrade.currencyPair;
  if (updatedTrade.tradeType) updateData.type = updatedTrade.tradeType;
  if (updatedTrade.entryPrice !== undefined) updateData.entry_price = updatedTrade.entryPrice;
  if (updatedTrade.exitPrice !== undefined) updateData.exit_price = updatedTrade.exitPrice;
  if (updatedTrade.lotSize !== undefined) updateData.quantity = updatedTrade.lotSize;
  if (updatedTrade.profitLoss !== undefined) updateData.profit = updatedTrade.profitLoss;
  if (updatedTrade.notes !== undefined) updateData.notes = updatedTrade.notes;
  if (updatedTrade.strategy !== undefined) updateData.strategy = updatedTrade.strategy;
  
  // Format the date to ISO string if it's a Date object
  if (updatedTrade.date !== undefined) {
    updateData.date = updatedTrade.date instanceof Date ? 
      updatedTrade.date.toISOString() : updatedTrade.date;
  }
  
  // Update in Supabase
  const { error } = await supabase
    .from('trades')
    .update(updateData)
    .eq('id', id);
  
  if (error) {
    throw error;
  }
};

// Delete a trade from Supabase
export const deleteTradeFromSupabase = async (id: string): Promise<void> => {
  // Delete from Supabase
  const { error } = await supabase
    .from('trades')
    .delete()
    .eq('id', id);
  
  if (error) {
    throw error;
  }
};
