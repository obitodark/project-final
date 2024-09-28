import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface Props {
  title?: string;
  description?: string;
  children: React.ReactNode;
  state: boolean;
  onClose: () => void;
  className?: string;
}
export const DialogCustom = ({ title, description, children, state = false, onClose,className }: Props) => {
  return (

    <Dialog open={state} onOpenChange={onClose}  >
      <DialogContent className={className}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
      
      </DialogContent>
    </Dialog>

  )
}

