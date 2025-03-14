
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
