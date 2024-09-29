import { Children, type ComponentProps } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { Label } from "../ui/label";
import { Box } from "./Box";


interface Props extends ComponentProps<typeof Select> {
  className?: string;
  placeHolder?: string;
  label?: string;
  title?: string;
  children: React.ReactNode;
}
export const SelectCustom = ({ className, placeHolder = "placeholder", label, title, children, ...props }: Props) => {
  return (
    <Box className="flex flex-col gap-1  w-full">
      {title && <Label htmlFor={title} className="h-auto" >{title}</Label>}
      <Select   {...props}>
        <SelectTrigger className={`w-full ${className}`}>
          <SelectValue placeholder={placeHolder} />
        </SelectTrigger>
        <SelectContent >
          <SelectGroup>
            {label && <SelectLabel >{label}</SelectLabel>}
            {children}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Box>

  )
}

