
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../TradeFormSchema';

interface PriceFieldsProps {
  form: UseFormReturn<FormValues>;
}

export const PriceFields: React.FC<PriceFieldsProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <FormField
        control={form.control}
        name="entryPrice"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Entry Price</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                step="0.00001" 
                {...field} 
                onChange={(e) => {
                  field.onChange(parseFloat(e.target.value) || 0);
                }}
              />
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
              <Input 
                type="number" 
                step="0.00001" 
                {...field} 
                onChange={(e) => {
                  field.onChange(parseFloat(e.target.value) || 0);
                }}
              />
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
              <Input 
                type="number" 
                step="0.01" 
                {...field} 
                onChange={(e) => {
                  field.onChange(parseFloat(e.target.value) || 0);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
