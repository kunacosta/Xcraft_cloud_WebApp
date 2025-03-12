
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../TradeFormSchema';

interface ResultFieldsProps {
  form: UseFormReturn<FormValues>;
}

export const ResultFields: React.FC<ResultFieldsProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="profitLoss"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Profit/Loss (pips)</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                step="0.01" 
                {...field} 
                readOnly 
                className="bg-gray-100" 
                value={field.value ?? 0} 
              />
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
            <FormLabel>Profit/Loss ($)</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                step="0.01" 
                {...field} 
                readOnly 
                className="bg-gray-100" 
                value={field.value ?? 0} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
