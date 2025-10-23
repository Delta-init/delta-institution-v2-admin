"use client";
import loginSchema from "@/schema/loginSchema";
import { login, signUp } from "@/api/auth";
import { useMutationData } from "./useMutation";
import useZodForm from "./useZodForm";
import { signIn } from "next-auth/react"
import { toast } from "sonner";
import { useRouter } from "nextjs-toploader/app";
import signUpSchema from "@/schema/signUpSchema";
import { IApiResponse } from "@/types/api";
import { useState, useEffect } from "react";
export const useAuth = (type: "login" | "signup" = "login") => {
  const router = useRouter()
  const schema = type === "login" ? loginSchema : signUpSchema;
  const fn = type === "login" ? login : signUp;
  const [isLoading, setIsLoading] = useState(false)
  const { mutate, isPending, error: mutationError, isSuccess } = useMutationData(['user'],
    (data) => fn(data),
    ["user"],
    onSubmit
  )

  useEffect(() => {
    if (isPending) {
      setIsLoading(true)
    }
    if (mutationError) {
      setIsLoading(false)
    }
  }, [isPending, mutationError])


  const form = useZodForm(schema, mutate);
  const { register, onFormSubmit, errors, reset, getValues, setValue } = form;
  function onSubmit(response: IApiResponse) {
    console.log(response, "response")
    signIn("credentials", {
      email: response.email,
      token: response.token,
      redirect: false,
    }).then(() => {
      setIsLoading(false)
      localStorage.setItem("loginId", getValues("email"))
      router.push("/admin/dashboard")
    }).catch((err) => {
      setIsLoading(false)
      toast.error("Something went wrong")
      console.log(err, "err")
    })

  }








  return { register, onFormSubmit, errors, reset, isPending: isLoading, mutationError, isSuccess, form, setValue }



}

