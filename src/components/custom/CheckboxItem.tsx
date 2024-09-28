import type { CheckboxProps } from "@radix-ui/react-checkbox";
import { Checkbox } from "../ui/checkbox"

interface Props extends CheckboxProps {
  label: string;
}
export const CheckboxItem = ({ label, ...props }: Props) => {
  return (
    <div className="flex items-center rounded-md hover:bg-indigo-50 pl-2  cursor-pointer w-full ">
      <Checkbox id={`id-${label}`}
        {...props}
      />
      <label
        htmlFor={`id-${label}`}
        className=" p-3 w-full text-gray-500 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  )
}

