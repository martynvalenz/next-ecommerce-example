'use server';
import prisma from '@/lib/prisma';

export const getUserAddress = async (userId:string) => {
  try {
    const userAddress = await prisma.userAddress.findUnique({
      where: {userId}
    });

    if(!userAddress) return null;

    const {countryId, ...rest} = userAddress;
    return {
      ...rest,
      country: countryId
    }
  }
  catch (error) {
    console.log(error);
    return {
      error: true,
      message: 'No se pudo obtener la dirección del usuario'
    };
  }
}