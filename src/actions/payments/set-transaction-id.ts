import prisma from '@/lib/prisma';

export const setTransactionId = async(orderId:string, transactionId: string) => {
  try {
    await prisma.order.update({
      where: {id: orderId},
      data: {transactionId}
    });

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