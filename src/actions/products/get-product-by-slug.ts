'use server';
import prisma from '@/lib/prisma';

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        slug
      },
      include: {
        ProductImage: {
          select: {
            url: true
          }
        }
      }
    });

    if (!product) return null;
    const { ProductImage, ...rest } = product;

    return {
      ...rest,
      images: product.ProductImage.map((image) => image.url),
    }
  } catch (error) {
    throw new Error('no se pudo obtener el producto');
  }
}