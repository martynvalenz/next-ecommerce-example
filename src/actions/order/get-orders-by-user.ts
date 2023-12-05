'use server';
import prisma from '@/lib/prisma';
import { auth } from "@/auth.config";

export const getOrdersByUser = async() => {
  const session = await auth();
  try {
    if(!session?.user) {
      return {
        ok:true,
        message:'Debe estar autenticado'
      }
    }
    
    const orders = await prisma.order.findMany({
      where:{
        userId:session?.user?.id
      },
      include:{
        OrderAddress:{
          select:{
            firstName:true,
            lastName:true
          }
        }
      }
    });
  
    return {
      ok:true,
      message:'Ordenes encontradas',
      orders
    }
  } catch (error) {
    return {
      ok:false,
      message:'Error al obtener las ordenes',
      error
    }
  }
}