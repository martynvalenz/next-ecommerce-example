'use server';
import prisma from '@/lib/prisma';
import { sleep } from '@/utils/sleep';

export const getStockBySlug = async (slug: string) => {
  try {
    await sleep(500);
    const stock = await prisma.product.findUnique({
      where: {
        slug
      },
      select: {
        inStock: true
      }
    });

    return stock?.inStock;
  } catch (error) {
    throw new Error('no se pudo obtener el stock');
  }
}