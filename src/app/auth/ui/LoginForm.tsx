'use client';

import { authenticate } from "@/actions/auth/login.actions";
import clsx from "clsx";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
// import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState, useFormStatus } from 'react-dom';
import { IoInformationOutline } from "react-icons/io5";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');
  // const router = useRouter();
  const [state, dispatch] = useFormState(authenticate, undefined);

  useEffect(() => {
    if(state === 'Success'){
      // router.replace('/');
      if(redirectTo){
        window.location.replace(redirectTo);
      }
      else{
        window.location.replace('/');
      }
    }
  }, [state])
  

  return (
    <form action={dispatch}>
      <div className="flex flex-col">

        <label htmlFor="email">Correo electrónico</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="email" name="email" />


        <label htmlFor="email">Contraseña</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="password" name="password" />

        <div
          className="flex h-8 items-end mb-2 space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {state && (
            <>
              <IoInformationOutline className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{state}</p>
            </>
          )}
        </div>

        <LoginButton />

        {/* divisor l ine */ }
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link
          href="/auth/new-account" 
          className="btn-secondary text-center">
          Crear una nueva cuenta
        </Link>

        </div>
    </form>
  )
}

function LoginButton(){
  const { pending } = useFormStatus();
  
  return(
    <button
      type="submit"
      aria-disabled={pending}
      disabled={pending}
      className={clsx({
        'btn-primary': !pending,
        'btn-primary-disable': pending
      })}>
      Ingresar
    </button>
  )
}