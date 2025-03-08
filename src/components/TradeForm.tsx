import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Trade, TradeType } from '@/types/trade';
import { useTrades } from '@/context/TradeContext';

const currencyPairs = [
  'EUR/USD', 'GBP/USD', 'USD/JPY', 'USD/CHF', 
  'USD/CAD', 'AUD/USD', 'NZD/USD', 'EUR/GBP',
  'EUR/JPY', 'GBP/JPY', 'AUD/JPY', 'EUR/AUD'
];

const formSchema = z.object({
  currencyPair: z.string().min(1, "Currency pair is required"),
  tradeType: z.enum(['buy', 'sell']),
  entryPrice: z.coerce.number().positive("Entry price must be positive"),
  exitPrice: z.coerce.number().positive("Exit price must be positive"),
  lotSize: z.coerce.number().positive("Lot size must be positive"),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface TradeFormProps {
  onSuccess?: () => void;
  initialData?: Trade;
  mode?: 'create' | 'edit';
}

const TradeForm: React.FC<TradeFormProps> = ({ 
  onSuccess, 
  initialData, 
  mode = 'create' 
}) => {
  const { addTrade, editTrade } = useTrades();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData 
      ? {
          currencyPair: initialData.currencyPair,
          tradeType: initialData.tradeType,
          entryPrice: initialData.entryPrice,
          exitPrice: initialData.exitPrice,
          lotSize: initialData.lotSize,
          notes: initialData.notes,
        }
      : {
          currencyPair: 'EUR/USD',
          tradeType: 'buy',
          entryPrice: 0,
          exitPrice: 0,
          lotSize: 0.1,
          notes: '',
        },
  });

  const onSubmit = async (values: FormValues) => {
    // Calculate P/L
    const entryPrice = values.entryPrice;
    const exitPrice = values.exitPrice;
    const lotSize = values.lotSize;
    
    // Simple P/L calculation (will depend on actual currency pairs and pips calculation)
    let profitLoss = 0;
    if (values.tradeType === 'buy') {
      profitLoss = (exitPrice - entryPrice) * 10000 * lotSize; // Simplified calculation
    } else {
      profitLoss = (entryPrice - exitPrice) * 10000 * lotSize; // Simplified calculation
    }
    
    if (mode === 'create') {
      // Fixed: Explicitly add all required properties to ensure they're not optional
      addTrade({
        currencyPair: values.currencyPair,
        tradeType: values.tradeType,
        entryPrice: values.entryPrice,
        exitPrice: values.exitPrice,
        lotSize: values.lotSize,
        notes: values.notes || "",  // Provide default empty string for optional notes
        profitLoss: profitLoss,
      });
    } else if (initialData?.id) {
      editTrade(initialData.id, {
        ...values,
        profitLoss,
      });
    }
    
    if (onSuccess) {
      onSuccess();
    }
    
    if (mode === 'create') {
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="currencyPair"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Currency Pair</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency pair" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {currencyPairs.map((pair) => (
                      <SelectItem key={pair} value={pair}>
                        {pair}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="tradeType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trade Type</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select trade type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="buy">Buy (Long)</SelectItem>
                    <SelectItem value="sell">Sell (Short)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="entryPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Entry Price</FormLabel>
                <FormControl>
                  <Input type="number" step="0.00001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="exitPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Exit Price</FormLabel>
                <FormControl>
                  <Input type="number" step="0.00001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="lotSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lot Size</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Add your trade notes here (strategy, market conditions, etc.)" 
                  {...field} 
                  rows={3}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full bg-xcraft-secondary hover:bg-xcraft-secondary/90"
        >
          {mode === 'create' ? 'Add Trade' : 'Update Trade'}
        </Button>
      </form>
    </Form>
  );
};

export default TradeForm;
