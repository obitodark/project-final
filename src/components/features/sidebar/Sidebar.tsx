" use client"
import Image from "next/image"
import { Box } from "../../custom/Box"
import { Title } from "../../custom/Title"
import { Separator } from "../../ui/separator"
import Link from "next/link"
import { FiBox } from "react-icons/fi";
import { FaList, FaRegUser } from "react-icons/fa6";
import { BiCategory } from "react-icons/bi"
import { Button } from "../../ui/button"
import { getToken, removeToken } from "@/utils/authService"
import type { ResponseJwt, Token } from "@/interface"
import { jwtDecode } from "jwt-decode"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"




export const Sidebar = () => {
  const tokenState = useSelector((state: any) => state.auth.authTokens.token);
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter()

  const handlerLogOut = () => {
    removeToken()
    router.push("/")
  }

  useEffect(() => {
    setUser(jwtDecode(tokenState).sub || null)
  }, [])
  return (
    <>
      <Box className={`bg-white    min-h-dvh p-5 w-auto sm:w-[320px] flex flex-col justify-between`}>
        <nav className='flex flex-col gap-2 justify-center'>
          <Box className='flex justify-center'>
            <Title title='Shop|Store' subtitle='SHOP | STORE' />
          </Box>

          <Box className='w-full flex flex-col items-center justify-center'>
            <Image
              src="/imgs/que-significa-tu-foto-de-perfil.webp"
              width={100}
              height={100}
              alt='image'
              className='rounded-full object-cover w-[100px] h-[100px] border border-black'
            />
            {user && <span className='text-sm font-semibold mt-2'>{user}</span>}
          </Box>
          <h2 className='text-center font-bold text-lg mt-5'>Menu</h2>
          <Separator />
          <Box className='flex flex-col items-center gap-2 mt-3 '>
            <Link href={"#"} className='px-3 py-2  flex items-center gap-2  text-sm  text-stone-500 rounded-md font-semibold hover:bg-indigo-600 hover:text-white hover:font-light w-full'>
              <FaRegUser />  Usuarios
            </Link>  <Link href={"/admin"} className='px-3 py-2  flex items-center gap-2  text-sm  text-stone-500 rounded-md font-semibold hover:bg-indigo-600 hover:text-white hover:font-light w-full'>
              <FiBox /> Produtos
            </Link>
            <Link href={"/admin/categories"} className='px-3 py-2  flex items-center gap-2  text-sm  text-stone-500 rounded-md font-semibold hover:bg-indigo-600 hover:text-white hover:font-light w-full'>
              <BiCategory />  Categorias
            </Link>
            <Link href={"/admin/subcategories"} className='px-3 py-2  flex items-center gap-2  text-sm text-stone-500 rounded-md font-semibold hover:bg-indigo-600 hover:text-white hover:font-light w-full'>
              <FaList />  Subcategorias
            </Link>
            <Link href={"/admin/brands"} className='px-3 py-2  flex items-center gap-2  text-sm rounded-md text-stone-500 font-semibold hover:bg-indigo-600 hover:text-white hover:font-light w-full'>
              <FiBox />  Marcas
            </Link>

          </Box>
          <Box className='mx-5 mt-20 '>
            <Button onClick={handlerLogOut} className="w-full" >
              Cerrar Sesion
            </Button>

          </Box>
        </nav>

      </Box>

    </>
  )
}

