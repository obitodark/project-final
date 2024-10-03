import Image from "next/image";
import { DialogCustom } from "../../custom/DialogCustom";
import { Box } from "../../custom/Box";
import { DialogFooter } from "../../ui/dialog";
import { Button } from "../../ui/button";


interface Props {
  state: boolean;
  onClose: () => void;
  image: string;
  name?: string;
  price: number;
  quantity: number;
  brand: string;
  onAdd: () => void;
}
export const CardDialog = ({ state, onClose, image, name = "producto", quantity, price,onAdd }: Props) => {
  return (
    <DialogCustom state={state} onClose={onClose} title="Confirmacion"
      description={`desea agregar al carrito "${name}"`}
      className="sm:max-w-[425px]"
    >
      <Box className="flex gap-2">
        <Image src={`${image}`} width={150} height={150} alt="image" />
        <Box className="flex flex-col justify-center text-sm font-semibold">
          <p>Price : <span className="">{price} pen</span></p>
          <p>marca : <span className="">Nike</span></p>
          <p>cantidad :<span className=""> {quantity}</span></p>
        </Box>
      </Box>
      <DialogFooter>

        <Button variant={'ghost'} onClick={onClose} >Cancelar</Button>
        <Button onClick={onAdd} type="submit"
        >Aceptar</Button>
      </DialogFooter>
    </DialogCustom>
  )
}

