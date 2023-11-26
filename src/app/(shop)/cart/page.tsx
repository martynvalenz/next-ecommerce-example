import { Title } from "@/components";
import { QuantitySelector } from "@/components/product/quantity-selector/QuantitySelector";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
  initialData.products[3],
  initialData.products[4],
  initialData.products[5],
]

export default function CartPage() {
  // redirect('/empty');

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm-px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Carrito" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Agregar más artículos</span>
            <Link href="/" className="underline mb-5">Continúa comprando</Link>

            {/* Productos en carrito */}
            {
              productsInCart.map(product => (
                <div key={product.slug} className="flex mb-5">
                  <Image src={`/products/${product.images[0]}`} width={100} height={100} style={{ width:'100px', height:'100px' }} alt={product.title} className="mr-5 rounded shadow-md" />

                  <div className="">
                    <p>{product.title}</p>
                    <p>$ {product.price}</p>
                    <QuantitySelector quantity={1} />
                    <button className="underline mt-3">
                      Remover
                    </button>
                  </div>
                </div>
              ))
            }
          </div>
          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2">Resumen de orden</h2>
            <div className="grid grid-cols-2">
              <span>Productos</span>
              <span className="text-right">3 artículos</span>
              <span>Subtotal</span>
              <span className="text-right">$ 75</span>
              <span>Impuestos</span>
              <span className="text-right">$ 25</span>
              <span className="text-2xl mt-5">Total: </span>
              <span className="text-2xl mt-5 text-right">$ 100</span>
            </div>

            <div className="mt-5 mb-5 w-full">
              <Link className="flex btn-primary justify-center" href="/checkout/address">
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}