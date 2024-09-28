

// import { Loginform } from "./ui/Loginform";

import { SignInForm } from "@/components/features/form/SignInForm";





export default function LoginPage() {

  return (
    <div className="flex w-full h-dvh bg-[#E7E8EB] justify-center   items-start sm:items-center ">

      <div className=" w-full h-[100%] bg-white rounded-xl shadow-2xl  border sm:h-auto sm:w-[400px]  relative z-50 ">

        <SignInForm />
      </div>
      

    </div>
  )
}


