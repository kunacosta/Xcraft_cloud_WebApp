
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../TradeFormSchema';

interface DateTimeFieldProps {
  form: UseFormReturn<FormValues>;
}

export const DateTimeField: React.FC<DateTimeFieldProps> = ({ form }) => {
  return (
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
  );
};
