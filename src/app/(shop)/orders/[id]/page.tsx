import { getOrderById } from "@/actions/order/get-order-by-id";
import { Title } from "@/components";
import { PaypalButton } from "@/components/paypal/PaypalButton";
import { QuantitySelector } from "@/components/product/quantity-selector/QuantitySelector";
import { initialData } from "@/seed/seed";
import { currencyFormat } from "@/utils/currencyFormatter";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]

interface Props {
  params:{
    id: string;
  }
}

export default async function OrdertPage({params}:Props) {
  const {id} = params;
  const {order,ok} = await getOrderById(id);
  
  if(!ok) {
    redirect('/');
  }

  const address = order?.OrderAddress;

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm-px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Órden: #${id.split('-').at(-1)}`} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            
            <div className={
              clsx(
                'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
                {
                  'bg-orange-500': !order!.isPaid,
                  'bg-green-700':order!.isPaid
                }
              )
            }>
              <IoCardOutline size={30} />
              {/* <span className="mx-2 text-xl">Pendiente de pago</span> */}
              <span className="mx-2 text-xl">
              {
                order!.isPaid ? (
                  'Órden pagada'
                ) : (
                  'Pendiente de pago'
                )
              }
              </span>
            </div>

            {/* Productos en carrito */}
            {/* {
              productsInCart.map(product => (
                <div key={product.slug} className="flex mb-5">
                  <Image src={`/products/${product.images[0]}`} width={100} height={100} style={{ width:'100px', height:'100px' }} alt={product.title} className="mr-5 rounded shadow-md" />

                  <div className="">
                    <p>{product.title}</p>
                    <p>$ {product.price} x3</p>
                    <p className="font-bold">Subtotal: ${product.price * 3}</p>
                  </div>
                </div>
              ))
            } */}
            {
              order!.OrderItem.map((item:any, index:number) => (
                <div key={index} className="flex mb-5">
                  <Image src={`/products/${item.product.ProductImage[0].url}`} width={100} height={100} style={{ width:'100px', height:'100px' }} alt={item.product.title} className="mr-5 rounded shadow-md" />

                  <div className="">
                    <p>{item.product.title}</p>
                    <p>{currencyFormat(item.price)} x{item.quantity}</p>
                    <p className="font-bold">Subtotal: {currencyFormat(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))
            }
          </div>
          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7">
          <h2 className="text-2xl mb-2">Dirección de entrega</h2>
          <div className="mb-10">
            <p className="text-xl">{address.firstName} {address.lastName}</p>
            <p className="font-bold">{address.address}</p>
            {address.address2 && <p className="font-bold">{address.address2}</p>}
            <p>{address.postalCode}</p>
            <p>{address.city}, {address.countryId}</p>
            <p>{address.email}</p>
            <p>{address.phone}</p>
          </div>

            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Confirmación de la órden</h2>
            <div className="grid grid-cols-2">
              <span>Productos</span>
              <span className="text-right">{order.itemsInOrder} artículos</span>
              <span>Subtotal</span>
              <span className="text-right">{currencyFormat(order.subTotal)}</span>
              <span>Impuestos</span>
              <span className="text-right">{currencyFormat(order.tax)}</span>
              <span className="text-2xl mt-5">Total: </span>
              <span className="text-2xl mt-5 text-right">{currencyFormat(order.total)}</span>
            </div>

            <div className="mt-5 mb-5 w-full">
              <PaypalButton
                orderId={order.id}
                amount={order.total}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}