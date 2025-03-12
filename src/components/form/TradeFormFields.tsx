
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from './TradeFormSchema';
import { 
  CurrencyPairField,
  TradeTypeField,
  DateTimeField,
  PriceFields,
  ResultFields,
  StrategyField,
  NotesField
} from './fields';

interface TradeFormFieldsProps {
  form: UseFormReturn<FormValues>;
}

export const TradeFormFields: React.FC<TradeFormFieldsProps> = ({ form }) => {
  // No automatic calculations - user will input amount manually

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CurrencyPairField form={form} />
        <TradeTypeField form={form} />
      </div>
      
      <DateTimeField form={form} />
      
      <PriceFields form={form} />
      
      <ResultFields form={form} />
      
      <StrategyField form={form} />
      
      <NotesField form={form} />
    </>
  );
};
