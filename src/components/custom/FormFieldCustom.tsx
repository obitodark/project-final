import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Control, FieldValues, Path } from "react-hook-form";

interface FormFieldCustomProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  rules?: any;
  children: React.ReactElement; // Ensure children is a React element
}

export const FormFieldCustom = <T extends FieldValues>({
  control,
  name,
  label,
  children,
  rules = {}
}: FormFieldCustomProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {React.cloneElement(children as React.ReactElement, {
              value: field.value,
              onChange: field.onChange
            })}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
