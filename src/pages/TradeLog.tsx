
import React, { useState } from 'react';
import { useTrades } from '@/context/TradeContext';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import EmptyState from '@/components/EmptyState';
import TradeForm from '@/components/TradeForm';
import TradeCard from '@/components/TradeCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trade } from '@/types/trade';

const TradeLog = () => {
  const { trades, loading } = useTrades();
  const [isAddTradeOpen, setIsAddTradeOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'buy' | 'sell'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'profit'>('newest');
  
  // Filter and sort trades
  const filteredTrades = trades
    .filter(trade => {
      // Apply search filter
      const matchesSearch = 
        trade.currencyPair.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trade.notes?.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Apply type filter
      const matchesType = 
        filterType === 'all' || 
        trade.tradeType === filterType;
      
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortBy === 'newest') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === 'oldest') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortBy === 'profit') {
        return b.profitLoss - a.profitLoss;
      }
      return 0;
    });
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }
  
  return (
    <div className="container py-8 space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-montserrat">Trade Log</h1>
        <Button 
          onClick={() => setIsAddTradeOpen(true)}
          className="bg-xcraft-secondary hover:bg-xcraft-secondary/90"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Trade
        </Button>
      </div>
      
      {trades.length > 0 ? (
        <>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by currency pair or notes..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select 
                value={filterType} 
                onValueChange={(value) => setFilterType(value as 'all' | 'buy' | 'sell')}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="buy">Buy Only</SelectItem>
                  <SelectItem value="sell">Sell Only</SelectItem>
                </SelectContent>
              </Select>
              
              <Select 
                value={sortBy} 
                onValueChange={(value) => setSortBy(value as 'newest' | 'oldest' | 'profit')}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="profit">Profit</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredTrades.length > 0 ? (
              filteredTrades.map((trade) => (
                <TradeCard key={trade.id} trade={trade} />
              ))
            ) : (
              <div className="col-span-full py-12">
                <EmptyState
                  title="No matching trades found"
                  description="Try adjusting your search filters to find what you're looking for."
                  action={null}
                />
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="min-h-[400px] flex items-center justify-center">
          <EmptyState
            title="Your trade log is empty"
            description="Start tracking your forex trades by adding your first entry."
            action={{ label: "Add Your First Trade", href: "#" }}
          />
        </div>
      )}
      
      <Dialog open={isAddTradeOpen} onOpenChange={setIsAddTradeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Trade</DialogTitle>
          </DialogHeader>
          <TradeForm onSuccess={() => setIsAddTradeOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TradeLog;
