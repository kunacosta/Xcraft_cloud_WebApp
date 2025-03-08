
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Trade } from '@/types/trade';
import { useTrades } from '@/context/TradeContext';
import { TradeFormFields } from './form/TradeFormFields';
import { FormValues, formSchema } from './form/TradeFormSchema';

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
          profitLoss: initialData.profitLoss,
          amount: initialData.amount,
          notes: initialData.notes,
          strategy: initialData.strategy,
        }
      : {
          currencyPair: 'EUR/USD',
          tradeType: 'buy',
          entryPrice: 0,
          exitPrice: 0,
          lotSize: 0.1,
          profitLoss: 0,
          amount: undefined,
          notes: '',
          strategy: '',
        },
  });

  const onSubmit = async (values: FormValues) => {    
    try {
      if (mode === 'create') {
        await addTrade({
          currencyPair: values.currencyPair,
          tradeType: values.tradeType,
          entryPrice: values.entryPrice,
          exitPrice: values.exitPrice,
          lotSize: values.lotSize,
          notes: values.notes || "",
          profitLoss: values.profitLoss, // Automatically calculated pips
          amount: values.amount, // Manually entered amount
          strategy: values.strategy,
        });
      } else if (initialData?.id) {
        await editTrade(initialData.id, {
          ...values,
        });
      }
      
      if (onSuccess) {
        onSuccess();
      }
      
      if (mode === 'create') {
        form.reset();
      }
    } catch (error) {
      console.error('Error submitting trade:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <TradeFormFields form={form} />
        
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
