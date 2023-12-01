'use server';
import { Gender } from '@prisma/client';
import prisma from '../../lib/prisma';

interface PaginationOptions {
  page?: number;
  take?: number;
  gender?:Gender;
}

export const getPaginatedProductsWithImages = async({
  page = 1,
  take = 12,
  gender,
}:PaginationOptions) => {
  if(isNaN(Number(page))) page = 1;
  if(page < 1) page = 1;
  
  try {
    const products = await prisma.product.findMany({
      take,
      skip: (page - 1) * take,
      include:{
        ProductImage:{
          take:2,
          select:{
            url:true
          }
        }
      },
      //! filter by Gender
      where:{
        gender
      }
    });

    // TODO: apply filter
    const totalCount = await prisma.product.count({
      where:{
        gender
      }
    });
    const totalPages = Math.ceil(totalCount / take);

    return{
      currentPage:page,
      totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
      }))
    }
  } 
  catch (error) {
    throw new Error('no se pudo obtener los productos');
  }
}