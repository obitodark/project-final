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
import type { APIResponseUser, ResponseJwt, Token, User } from "@/interface"
import { jwtDecode } from "jwt-decode"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { getRequest } from "@/utils/http"

export const Sidebar = () => {
  const router = useRouter()
  const handlerLogOut = () => {
    removeToken()
    router.push("/")
  }

  const { data: user = undefined } = useQuery<User>({
    queryKey: ['user'],
    queryFn: async () => {
      const token = getToken()
      let decoded: ResponseJwt | null = null;
      if (token) {
        decoded = jwtDecode<ResponseJwt>(token);
      }
      return (await getRequest<APIResponseUser>(`/users/email/${decoded?.sub}`, true)).data?.result || undefined;
    },
  });

  return (
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
          {user && <span className='text-sm font-semibold mt-2'>{user.name}</span>}
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

  )
}

