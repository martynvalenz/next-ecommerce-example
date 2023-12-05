'use client'

import { placeOrder } from "@/actions/order/place-order";
import { useAddressStore } from "@/store/address/address.store";
import { useCartStore } from "@/store/cart/cart.store";
import { currencyFormat } from "@/utils/currencyFormatter";
import { sleep } from "@/utils/sleep";
import clsx from "clsx";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export const PlaceOrder = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const address = useAddressStore(state => state.address);
  const cart = useCartStore(state => state.cart);
  const clearCart = useCartStore(state => state.clearCart);
  const {items,subTotal,total,tax} = useCartStore(state => state.getSummaryInfo());

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async() => {
    setIsPlacingOrder(true);
    // await sleep(2000);
    const productsToOrder = cart.map(product => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));
    const res = await placeOrder(productsToOrder,address);
    if(!res.ok) {
      setIsPlacingOrder(false);
      setErrorMessage(res.message || 'Ocurrió un error al crear la órden');
      return;
    }

    clearCart();
    setIsPlacingOrder(false);
    router.replace(`/orders/${res.order?.id}`);
  }

  if(!loaded) return <>Cargando...</>;
  
  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl mb-2">Dirección de entrega</h2>
      <div className="mb-10">
        <p className="text-xl">{address.firstName} {address.lastName}</p>
        <p className="font-bold">{address.address}</p>
        {address.address2 && <p className="font-bold">{address.address2}</p>}
        <p>{address.postalCode}</p>
        <p>{address.city}, {address.country}</p>
        <p>{address.email}</p>
        <p>{address.phone}</p>
      </div>

      <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

      <h2 className="text-2xl mb-2">Confirmación de la órden</h2>
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
        <p className="mb-5">
          <span className="text-xs">
            Al hacer clic en &quot;Colocar órden&quot;, aceptas los <Link className="underline" href="/terms">Términos y condiciones</Link> y la <Link className="underline" href="/privacy">Política de privacidad</Link> de este sitio.
          </span>
        </p>
        {
          errorMessage && 
          (<p className="text-red-500 text-center">{errorMessage}</p>)
        }
        <button
          className={clsx('flex justify-center w-full',{
            'btn-primary': !isPlacingOrder,
            'btn-primary-disable': isPlacingOrder,
          })}
          disabled={isPlacingOrder}
          // href="/orders/123"
          onClick={onPlaceOrder}
        >
          {
            isPlacingOrder ?(
              'Creando órden...'
            ) : (
              'Colocar órden'
            )
          }
        </button>
      </div>
    </div>
  )
}
