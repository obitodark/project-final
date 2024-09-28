

import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"

interface Props {
  direction: "top" | "right" | "bottom" | "left";
  title?: string;
  description?: string;
  children: React.ReactNode;
  status: boolean;
  onClose: () => void;
}
export const DrawerCuston = ({ direction, title = "", description, children, status = false, onClose }: Props) => {


  return (

    <Sheet open={status} onOpenChange={onClose} >
      <SheetContent side={direction}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>
            {description}
          </SheetDescription>
        </SheetHeader>
        {children}
        <SheetFooter>
        </SheetFooter>
      </SheetContent>
    </Sheet>


  )
}

