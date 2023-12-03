'use server';

import { UserAddress } from '@/interfaces/userAddress.interface';
import prisma from '@/lib/prisma';
import { create } from 'domain';

export const setUserAddress = async (address:UserAddress,userId:string) => {
  try {
    const userAddress = await createOrReplaceAddress(address, userId);

    return userAddress;
  }
  catch (error) {
    console.log(error);
    return {
      error: true,
      message: 'No se pudo guardar la dirección del usuario'
    };
  }
}

const createOrReplaceAddress = async (address:UserAddress, userId:string) => {
  try {
    const userAddress = await prisma.userAddress.findUnique({
      where: {userId}
    });

    const addressData = {
      userId,
      firstName:address.firstName,
      lastName:address.lastName,
      address:address.address,
      address2:address.address2,
      postalCode:address.postalCode,
      city:address.city,
      email:address.email,
      phone:address.phone,
      countryId:address.country
    }

    if(!userAddress) {
      const newAddress = await prisma.userAddress.create({
        data: addressData
      });

      return newAddress;
    }

    const updatedAddress = await prisma.userAddress.update({
      where: {userId},
      data: addressData
    });

    return updatedAddress;
  }
  catch (error) {
    console.log(error);
    return {
      error: true,
      message: 'No se pudo guardar la dirección del usuario'
    };
  }
}