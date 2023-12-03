'use client';
import { login } from '@/actions/auth/login.actions';
import { registerUser } from '@/actions/auth/register.actions';
import clsx from 'clsx';
import Link from 'next/link'
import { useState } from 'react';
import { useForm, SubmitHandler, set } from "react-hook-form";
import { useSearchParams } from 'next/navigation';

type FormInputs = {
  name:string;
  email:string;
  password:string;
}

export const RegisterForm = () => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');
  
  const [errorMessage, setErrorMessage] = useState('')
  const {register, handleSubmit, formState:{errors}} = useForm<FormInputs>();
  const onSubmit:SubmitHandler<FormInputs> = async(data) => {
    setErrorMessage('');
    const {name, email, password} = data;

    // Server action
    const res = await registerUser(name, email, password);
    if(!res.ok){
      console.log('res', res);
      setErrorMessage(res.message);
      return;
    }

    await login(email.toLowerCase(), password);
    if(redirectTo){
      window.location.replace(redirectTo);
    }
    else{
      window.location.replace('/');
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">

      <div className="flex flex-col mb-5">
        <label htmlFor="name">Nombre completo</label>
        <input
          className={clsx('px-5 py-2 border bg-gray-200 rounded mb-1', {
            'border-red-500': errors.name,
          })} 
          autoFocus
          type="text" {...register('name',{required:true})} />
        {
          errors.name?.type === 'required' && (
            <p className="text-red-500">El nombre es obligatorio</p>
          )
        }
      </div>

      <div className="flex flex-col mb-5">
        <label htmlFor="email">Correo electrónico</label>
        <input
          className={clsx('px-5 py-2 border bg-gray-200 rounded mb-1', {
            'border-red-500': errors.email,
          })} 
          type="email" {...register('email',{required:true, pattern:/^\S+@\S+$/i })} />
        {
          errors.email?.type === 'required' && (
            <p className="text-red-500">El correo es obligatorio</p>
          )
        }
      </div>

      <div className="flex flex-col mb-5">
        <label htmlFor="email">Contraseña</label>
        <input
          className={clsx('px-5 py-2 border bg-gray-200 rounded mb-1', {
            'border-red-500': errors.password,
          })} 
          type="password" {...register('password',{required:true})} />
        {
          errors.password?.type === 'required' && (
            <p className="text-red-500">La contraseña es obligatoria</p>
          )
        }
      </div>

      <p className="text-red-500">{errorMessage}</p>

      <button
        className="btn-primary">
        Crear cuenta
      </button>


      {/* divisor l ine */ }
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link
        href="/auth/login" 
        className="btn-secondary text-center">
        Iniciar sesión
      </Link>

    </form>
  )
}
