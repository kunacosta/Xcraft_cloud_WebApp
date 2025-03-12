
import React, { useEffect } from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { FormValues } from './TradeFormSchema';
import { calculatePips, calculatePipValue, calculateMonetaryValue } from '@/utils/pipCalculator';
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
  // Watch form values for automatic pip calculation
  const entryPrice = useWatch({
    control: form.control,
    name: "entryPrice",
  });
  
  const exitPrice = useWatch({
    control: form.control,
    name: "exitPrice",
  });
  
  const tradeType = useWatch({
    control: form.control,
    name: "tradeType",
  });
  
  const currencyPair = useWatch({
    control: form.control,
    name: "currencyPair",
  });
  
  const lotSize = useWatch({
    control: form.control,
    name: "lotSize",
  });

  // Calculate pips and monetary value whenever relevant values change
  useEffect(() => {
    if (entryPrice && exitPrice && lotSize) {
      // Calculate pips based on the standard formula
      const pips = calculatePips(entryPrice, exitPrice, currencyPair, tradeType);
      
      // Calculate the monetary value
      const pipValue = calculatePipValue(currencyPair);
      const monetaryValue = calculateMonetaryValue(pips, pipValue, lotSize);
      
      // Update both fields
      form.setValue("profitLoss", Number(pips.toFixed(2)));
      form.setValue("amount", Number(monetaryValue.toFixed(2)));
    }
  }, [entryPrice, exitPrice, tradeType, currencyPair, lotSize, form]);

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
