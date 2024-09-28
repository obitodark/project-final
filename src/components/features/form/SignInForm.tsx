"use client";
import { jwtDecode } from 'jwt-decode';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import axiosInstance from "../../../config/axiosInstance"
import { Title } from "@/components/custom/Title";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { InputText } from "@/components/custom/InputText";
import { FormFieldCustom, MessageError } from "@/components/custom";
import { SignInShema } from "@/utils/zod";
import { useDispatch } from "react-redux";
import type { APIResponseAuth, ResponseJwt } from "@/interface";
import type { Dispatch } from "@reduxjs/toolkit";
import { login } from "@/store/Auth";
import { useRouter } from "next/navigation"
import { postRequest } from '@/utils/http';


export const SignInForm = () => {

  const [error, setError] = useState<any>(null);
  const router = useRouter();

  const dispatch = useDispatch()
  const form = useForm<z.infer<typeof SignInShema>>({
    resolver: zodResolver(SignInShema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginUser = async (values: { email: string; password: string }, dispatch: Dispatch) => {

    const { data, state } = await postRequest<APIResponseAuth>('authenticate/signin', values);
    if (state !== 200) {
      setError(data)
    } else {
      dispatch(login(data.result));
      setError(undefined);
      console.log("Login exitoso:", data);
      const decoded: ResponseJwt = jwtDecode(data.result.token);

      if (decoded.role === 'ADMIN') {
        router.push("/admin")
      } else {
        router.push("/")
      }
      console.log("gmail", decoded.sub)

    }
  }


  const onSubmit = async (values: z.infer<typeof SignInShema>) => {

    try {
      await loginUser(values, dispatch);
    } catch (error) {

    }

  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-10 relative flex flex-col gap-4">
        <Title title="Iniciar Sesion" subtitle="Bienvenido a Shop | Store" />
        <FormFieldCustom
          control={form.control}
          name="email"
          label="Usuario"
        >
          <InputText type="email" placeholder="ejemplo@mail.com" />
        </FormFieldCustom>

        <FormFieldCustom
          control={form.control}
          name="password"
          label="Contraseña"
        >
          <InputText type="password" placeholder="**********" />
        </FormFieldCustom>
        
        {error && <MessageError message={error.details}
        />}
        <Button type="submit" className="mt-10 rounded text-sm">
          Iniciar Sesión
        </Button>
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">o</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>
        <Link href="/auth/new-account" className="underline hover:text-blue-600 p-1 text-center text-sm">
          Cree una nueva cuenta
        </Link>
      </form>
    </Form>
  );
};

