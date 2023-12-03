'use server';

import prisma from '@/lib/prisma';

export const deleteUserAddress = async (userId:string) => {
  try {
    await prisma.userAddress.delete({
      where: {userId}
    });

    return {
      error:false,
      message: 'Dirección eliminada correctamente'
    };
  }
  catch (error) {
    console.log(error);
    return {
      error: true,
      message: 'No se pudo eliminar la dirección del usuario'
    };
  }
}