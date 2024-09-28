"use client"
import { MessageError } from '@/components/custom'
import { Box } from '@/components/custom/Box'
import { Button } from '@/components/ui/button'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import { putRequest } from '@/utils/http'
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

export const ComfirmationCodeForm = () => {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState<any>(null)
  const searchParams = useSearchParams();
  const origin = searchParams.get('origin');
  const handlerSendCode = async () => {

    const { data, state } = await putRequest(`/users/codeComfirmation/${code}`, null, true)
    if (state !== 200 && data) {
      setError(data);
    } else {
      setError(null)
      //  router.push("/auth/login")
      if (origin === 'address') {
        router.push('/checkout/address');
      } else if (origin === 'register') {
        router.push('/auth/login');
      }
    }
  }


  return (
    <Box className='flex  flex-col justify-center items-center gap-5'>

      <InputOTP maxLength={6}
        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
        className='font-semibold '
        onChange={(code) => setCode(code)}
      >
        <InputOTPGroup>
          {[... new Array(6)].map((_, index) => (
            <InputOTPSlot key={index} className='font-semibold text-lg size-[40px] sm:size-[50px] m-1 border border-stone-300 shadow-none' index={index} />
          ))}
        </InputOTPGroup>
      </InputOTP>
      {error && <MessageError message={error.details} />}
      <Button className='w-full'
        onClick={handlerSendCode}
      >
        Verificar
      </Button>
    </Box>
  )
}

