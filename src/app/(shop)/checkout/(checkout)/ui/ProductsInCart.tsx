'use client'

import { useCartStore } from "@/store/cart/cart.store";
import { currencyFormat } from "@/utils/currencyFormatter";
import Image from "next/image";
import { useEffect, useState } from "react";


export const ProductsInCart = () => {
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
              <span className="hover:underline">
                <p>{product.title} - <span>{product.size} ({product.quantity})</span></p>
              </span>
              <p className="">{product.quantity} x {currencyFormat(product.price)}</p>
              <p className="font-bold">{currencyFormat(product.price * product.quantity)}</p>
            </div>
          </div>
        ))
      }
    </>
  )
}
