'use client';
import { useCartStore } from "@/store/cart/cart.store";
import { currencyFormat } from "@/utils/currencyFormatter";
import Link from "next/link";
import { useEffect, useState } from "react";

export const CartSummary = () => {
  const {items,subTotal,total,tax} = useCartStore(state => state.getSummaryInfo());
  const [loaded, setloaded] = useState(false);

  useEffect(() => {
    setloaded(true);
  }, []);

  if(!loaded){
    return <p>Cargando...</p>
  }
  
  return (
    <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
      <h2 className="text-2xl mb-2">Resumen de orden</h2>
      <div className="grid grid-cols-2">
        <span>Productos</span>
        <span className="text-right">{items} artículos</span>
        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>
        <span>Impuestos</span>
        <span className="text-right">{currencyFormat(tax)}</span>
        <span className="text-2xl mt-5">Total: </span>
        <span className="text-2xl mt-5 text-right">{currencyFormat(total)}</span>
      </div>

      <div className="mt-5 mb-5 w-full">
        <Link className="flex btn-primary justify-center" href="/checkout/address">
          Checkout
        </Link>
      </div>
    </div>
  )
}
