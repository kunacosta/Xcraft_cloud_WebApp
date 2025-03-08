
import React, { useEffect } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { FormValues, currencyPairs } from './TradeFormSchema';
import { tradingStrategies } from '@/types/trade';
import { calculatePips, calculatePipValue, calculateMonetaryValue } from '@/utils/pipCalculator';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface TradeFormFieldsProps {
  form: UseFormReturn<FormValues>;
}

export const TradeFormFields: React.FC<TradeFormFieldsProps> = ({ form }) => {
  // Watch form values for automatic pip calculation
  const entryPrice = useWatch({
    control: form.control,
    name: "entryPrice",
    defaultValue: 0
  });
  
  const exitPrice = useWatch({
    control: form.control,
    name: "exitPrice",
    defaultValue: 0
  });
  
  const tradeType = useWatch({
    control: form.control,
    name: "tradeType",
    defaultValue: "buy"
  });
  
  const currencyPair = useWatch({
    control: form.control,
    name: "currencyPair",
    defaultValue: "EUR/USD"
  });
  
  const lotSize = useWatch({
    control: form.control,
    name: "lotSize",
    defaultValue: 0.1
  });

  // Calculate pips and monetary value whenever relevant values change
  useEffect(() => {
    if (entryPrice && exitPrice) {
      // Calculate pips based on the standard formula
      const pips = calculatePips(entryPrice, exitPrice, currencyPair, tradeType);
      
      // Update the form with the calculated pips
      form.setValue("profitLoss", Number(pips.toFixed(2)));
      
      // If we have a lot size, calculate the monetary value
      if (lotSize) {
        const pipValue = calculatePipValue(currencyPair);
        const monetaryValue = calculateMonetaryValue(pips, pipValue, lotSize);
        form.setValue("amount", Number(monetaryValue.toFixed(2)));
      }
    }
  }, [entryPrice, exitPrice, tradeType, currencyPair, lotSize, form]);

  return (
    <>
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
      
      {/* Date picker field */}
      <FormField
        control={form.control}
        name="date"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Trade Date & Time</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP p") // Format with date and time
                    ) : (
                      <span>Select date and time</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(date) => {
                    // Preserve the time when selecting a new date
                    if (date) {
                      const currentTime = field.value || new Date();
                      date.setHours(currentTime.getHours());
                      date.setMinutes(currentTime.getMinutes());
                    }
                    field.onChange(date);
                  }}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
                <div className="p-3 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Time:</span>
                    <Input
                      type="time"
                      className="w-auto"
                      value={field.value ? format(field.value, "HH:mm") : ""}
                      onChange={(e) => {
                        const date = field.value || new Date();
                        const [hours, minutes] = e.target.value.split(':');
                        date.setHours(parseInt(hours || "0", 10));
                        date.setMinutes(parseInt(minutes || "0", 10));
                        field.onChange(date);
                      }}
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
      
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="profitLoss"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profit/Loss (pips) - Auto-calculated</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} readOnly className="bg-gray-100" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount ($) - Auto-calculated</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} readOnly className="bg-gray-100" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="strategy"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Trading Strategy</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select trading strategy (optional)" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {tradingStrategies.map((strategy) => (
                  <SelectItem key={strategy.value} value={strategy.value}>
                    {strategy.label}
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
    </>
  );
};
