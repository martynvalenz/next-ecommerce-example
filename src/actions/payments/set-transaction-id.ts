'use server';
import prisma from '@/lib/prisma';

export const setTransactionId = async(orderId:string, transactionId: string) => {
  try {
    const order = await prisma.order.update({
      where: {id: orderId},
      data: {transactionId}
    });

    if(!order) {
      return {
        ok: false,
        error: `No se encontró una transacción con ese id ${orderId}`
      }
    }

    return {
      ok: true,
    }
  } catch (error) {
    return {
      ok: false,
      error: 'No se pudo guardar el id de la transacción'
    }
  }
};