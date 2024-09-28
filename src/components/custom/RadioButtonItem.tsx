import { Label } from "../ui/label"
import { RadioGroupItem } from "../ui/radio-group"

interface Props {
  value: string;

}
export const RadioButtonItem = ({ value }: Props) => {
  return (
    <div key={value} className="flex items-center space-x-2 w-full rounded-md hover:bg-indigo-50 pl-2  text-gray-500 hover:text-indigo-600">
      <RadioGroupItem value={value} id={`r-${value}`}
      />
      <Label className="w-full p-2 " htmlFor={`r-${value}`}>{value}</Label>
    </div>
  )
}

