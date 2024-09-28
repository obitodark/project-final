import Link from "next/link";
import { DrawerCuston } from "../../custom"
import { ListFilter } from "../filter/ListFilter"
import { Box } from "../../custom/Box";
import { removeToken } from "@/utils/authService";

interface Props {
  status: boolean;
  onClose: () => void;
}
export const DrawerMenu = ({ status, onClose }: Props) => {
  const handlerCloseSession = () => {
    removeToken()
    onClose()
  }
  return (
    <DrawerCuston title="Menu" status={status} onClose={onClose} direction="right" >
      <Box>
        <Link href={"/auth/login"} onClick={onClose} className="hover:bg-slate-200  block  w-full  rounded-md p-2 ">Login</Link>
        <Link href={"/auth/new-account"} className="hover:bg-slate-200  block  w-full  rounded-md p-2 ">Registarse</Link>
        <Link href={"/checkout/address"} className="hover:bg-slate-200  block  w-full  rounded-md p-2 ">Mi cuenta</Link>
        <Link href={"/cart"} className="hover:bg-slate-200  block  w-full  rounded-md p-2 ">Carrito</Link>
        <Link href={"#"} className="hover:bg-slate-200  block  w-full  rounded-md p-2 ">Orders</Link>
        <Link href={"/"} onClick={handlerCloseSession} className="hover:bg-slate-200  block  w-full  rounded-md p-2 ">Cerrar sesion</Link>
      </Box>

    </DrawerCuston>
  )
}

