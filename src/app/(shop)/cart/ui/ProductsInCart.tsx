'use client'

import { QuantitySelector } from "@/components/product/quantity-selector/QuantitySelector";
import { useCartStore } from "@/store/cart/cart.store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";


export const ProductsInCart = () => {
  const updateProductQuantity = useCartStore(state => state.updateProductQuantity);
  const removeProductFromCart = useCartStore(state => state.removeProductFromCart);
  const productsInCart = useCartStore(state => state.cart);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  

  if(!loaded){
    return <p>Loading...</p>
  }
  return (
    <>
      {
        productsInCart.map(product => (
          <div key={`${product.slug}-${product.size}`} className="flex mb-5">
            <Image src={`/products/${product.image}`} width={100} height={100} style={{ width:'100px', height:'100px' }} alt={product.title} className="mr-5 rounded shadow-md" />

            <div className="">
              <Link href={`/product/${product.slug}`} className="hover:underline cursor-pointer">
                <p>{product.title} - <span>{product.size}</span></p>
              </Link>
              <p>$ {product.price}</p>
              <QuantitySelector quantity={product.quantity} onQuantityChanged={quantity => updateProductQuantity(product,quantity)} />
              <button className="underline mt-3" onClick={() => removeProductFromCart(product)}>
                Remover
              </button>
            </div>
          </div>
        ))
      }
    </>
  )
}
