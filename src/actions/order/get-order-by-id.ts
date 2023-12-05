'use server';

import { auth } from '@/auth.config';
import prisma from '../../lib/prisma';

export const getOrderById = async (id: string):Promise<any> => {
  const session = await auth();

  if (!session) throw new Error('User not found');

  try {
    const order = await prisma.order.findUnique({
      where:{id},
      include:{
        OrderAddress:true,
        OrderItem:{
          select:{
            price:true,
            quantity:true,
            size:true,
            product:{
              select:{
                title:true,
                slug:true,
                ProductImage:{
                  select:{
                    url:true
                  },
                  take:1
                }
              }
            }
          }
        }
      }
    });
  
    if (!order) {
      return{
        ok:false,
        message:'Order not found, call the police!'
      }
    };

    if(session.user.role !== 'user'){
      if(session.user.id !== order.userId){
        throw `User ${session.user.id} is not allowed to access this order`;
      }
    }
  
    return {
      order,
      ok:true
    };
  }
  catch (error) {
    return {
      ok:false,
      message:'Order not found, call the police!'
    }
  }
} 