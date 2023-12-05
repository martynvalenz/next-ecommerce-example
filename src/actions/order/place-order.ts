'use server';

import { auth } from "@/auth.config";
import { type Size } from "@/interfaces";
import { type UserAddress } from "@/interfaces/userAddress.interface";
import prisma from '../../lib/prisma';

interface ProductToOrder {
  productId:string;
  quantity:number;
  size:Size;
}

export const placeOrder = async(productIds:ProductToOrder[], address:UserAddress) => {
  const session = await auth();
  const userId = session?.user?.id;

  if(!userId) throw new Error('User not found');

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map(prod => prod.productId)
      }
    }
  });

  const itemsInOrder = productIds.reduce((count, prod) => count + prod.quantity, 0);

  const {subTotal, tax, total} = productIds.reduce((totals, item) => {
    const productQuantity = item.quantity;
    const product = products.find(prod => prod.id === item.productId);
    if(!product) throw new Error(`Product ${item.productId} not found`);
    const subTotal = product.price * productQuantity;
    totals.subTotal += subTotal;
    totals.tax += subTotal * 0.16;
    totals.total += subTotal + totals.tax;

    return totals;
  },{
    subTotal: 0,
    // shipping: 0,
    tax: 0,
    total: 0
  });

  const country = await prisma.country.findUnique({
    where: {
      id: address.country
    }
  });

  try {
    const prismaTx = await prisma.$transaction(async(tx) => {
      // 1. Update product stock
      const updatedProductsPromises = products.map(async(product) => {
        // Accumulate quantity of same products
        const productQuantity = productIds.filter(
          p => p.productId === product.id
        ).reduce((acc, item) => acc + item.quantity, 0);
  
        if(productQuantity === 0) throw new Error(`El artículo ${product.title} no tiene una cantidad definida`);
  
        return tx.product.update({
          where: { id: product.id },
          data: {
            inStock: {
              decrement: productQuantity
            }
          }
        });
      });
  
      const updatedProducts = await Promise.all(updatedProductsPromises);
      // Verify negative stock
      updatedProducts.forEach(product => {
        if(product.inStock < 0) throw new Error(`El artículo ${product.title} no tiene inventario suficiente`);
      });
  
      // 2. Create order and details
      const order = await tx.order.create({
        data: {
          userId,
          itemsInOrder,
          subTotal,
          tax,
          total,
          OrderItem:{
            createMany:{
              data: productIds.map(prod => ({
                productId: prod.productId,
                quantity: prod.quantity,
                size: prod.size,
                price: products.find(p => p.id === prod.productId)?.price || 0
              }))
            }
          }
        }
      });
  
      //TODO: Validate if price = 0 in any product
  
      // 3. Create order address
      const orderAddress = await tx.orderAddress.create({
        data: {
          orderId: order.id,
          firstName:address.firstName,
          lastName:address.lastName,
          address:address.address,
          address2:address.address2,
          postalCode:address.postalCode,
          city:address.city,
          phone:address.phone,
          countryId: country?.id || '',
        }
      });
  
      return {
        order, 
        orderAddress
      }
    });

    return {
      error: null,
      ok: true,
      order: prismaTx.order,
      prismaTx
    }
  } 
  catch (error:any) {
    return {
      message: error.message,
      ok:false,
      order: null
    }
  }
}