import React from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { FormItem, FormLabel, FormControl, FormMessage, FormField } from "../ui/form";


interface FormFieldSelectCustomProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  rules?: any; // Puedes definir una interfaz específica para reglas si es necesario
  children: React.ReactElement;
}

export const FormFieldSelectCustom = <T extends FieldValues>({
  control,
  name,
  label,
  rules = {},
  children,
}: FormFieldSelectCustomProps<T>) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <FormField
          control={control}
          name={name}
          render={({ field }) =>
            React.cloneElement(children, {
              value: field.value,
              onChange: (event: React.ChangeEvent<HTMLSelectElement>) => {
                field.onChange(event.target.value); 
                if ((children as any).props.onValueChange) {
                  (children as any).props.onValueChange(event.target.value); 
                }
              }
            })
          }
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
