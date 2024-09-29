import { AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

interface Props {
  children: React.ReactNode;
  label: string;
}
export const ListDropdown = ({ children, label }: Props) => {
  return (
    <>
      <AccordionItem value={label}>
        <AccordionTrigger>{label}</AccordionTrigger>
        <AccordionContent>
          {children}
        </AccordionContent>
      </AccordionItem>
    </>
  )
}

