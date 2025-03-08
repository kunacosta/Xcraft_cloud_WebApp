
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../TradeFormSchema';

interface TradeTypeFieldProps {
  form: UseFormReturn<FormValues>;
}

export const TradeTypeField: React.FC<TradeTypeFieldProps> = ({ form }) => {
  return (
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
  );
};
