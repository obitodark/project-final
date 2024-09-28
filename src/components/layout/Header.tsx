"use client"
import Link from "next/link"
import { DrawerMenu } from "../features/drawer"
import { useBoolean } from "@/hook/useBoolean"
import { IoCartOutline } from "react-icons/io5"


export const Header = () => {
  const [isOpen, isClose, state] = useBoolean()
  return (
    <nav className="flex px-5 justify-between items-center w-full">
      <div>
        <Link href={"/"}>
          <span className="antialiased  text-xl">Tienda | </span>
          <span className="antialiased font-bold text-xl">
            Obis
          </span>

        </Link>
      </div>
      <div className="hidden sm:block">

        <Link href={"/auth/login"} className="m-2  px-3 py-2 rounded-full transition-all font-semibold text-sm">Iniciar Sesion</Link>
        <Link href={"/auth/new-account"} className="m-2  px-3 py-2 rounded-full transition-all font-semibold text-sm">Registrarse</Link>

      </div>
      <div className=" flex items-center gap-2">
        <Link href={"/search"}>
          {/* <IoSearchOutline className="w-5 h-5" /> */}
        </Link>
        <Link href={"/cart"}>
          <div className="relative">
            <span className="absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white">3</span>
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>
        <button className="m-2 p-2 rounded-md  transition-all hover:bg-gray-100" onClick={isOpen}>
          Menu
        </button>
      </div>
      <DrawerMenu status={state} onClose={isClose} />
    </nav>
  )
}
