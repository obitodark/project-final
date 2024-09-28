import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Box } from "./Box";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactElement;
  className?: string;
  title?: string


}
export const InputText = ({ label, className, title, icon, ...props }: Props) => {
  return (
    <Box className={"relative h-10 " + className}>
      {label && <Label htmlFor={title} className="text-gray-500 block w-auto pr-1">{label}</Label>}
      {
        icon &&
        <div className=" bottom-1 h-10 z-10  absolute flex justify-center   w-auto items-center ">
          <span className="pl-2 flex self-center  pointer-events-none">
            {icon}
          </span>
        </div>
      }
      {title && <Label className="h-auto" htmlFor={title}>{title}</Label>}
      <Input id={title} {...props} className={`bg-gray-200 ${icon && "pl-8"}`} />
    </Box>
  )
}

