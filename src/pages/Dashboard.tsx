
import React, { useState } from 'react';
import { useTrades } from '@/context/TradeContext';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import EmptyState from '@/components/EmptyState';
import TradeForm from '@/components/TradeForm';
import TradeCard from '@/components/TradeCard';
import TradeSummary from '@/components/TradeSummary';

const Dashboard = () => {
  const { trades, loading } = useTrades();
  const [isAddTradeOpen, setIsAddTradeOpen] = useState(false);
  
  const recentTrades = [...trades].slice(0, 5);
  
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
        <h1 className="text-3xl font-bold font-montserrat">Dashboard</h1>
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
          <section>
            <h2 className="text-xl font-semibold mb-4">Performance Overview</h2>
            <TradeSummary trades={trades} />
          </section>
          
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Recent Trades</h2>
              <Button variant="link" asChild>
                <a href="/log">View All Trades</a>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {recentTrades.map((trade) => (
                <TradeCard key={trade.id} trade={trade} />
              ))}
            </div>
          </section>
        </>
      ) : (
        <div className="min-h-[400px] flex items-center justify-center">
          <EmptyState
            title="No trades recorded yet"
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

export default Dashboard;
