
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { FormValues, currencyPairs } from '../TradeFormSchema';

interface CurrencyPairFieldProps {
  form: UseFormReturn<FormValues>;
}

export const CurrencyPairField: React.FC<CurrencyPairFieldProps> = ({ form }) => {
  return (
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
  );
};
