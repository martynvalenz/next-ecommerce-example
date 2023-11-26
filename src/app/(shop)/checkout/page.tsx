import { Title } from "@/components";
import { QuantitySelector } from "@/components/product/quantity-selector/QuantitySelector";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm-px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Verificar órden" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Ajustar elementos</span>
            <Link href="/cart" className="underline mb-5">Editar carrito</Link>

            {/* Productos en carrito */}
            {
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
            }
          </div>
          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">Marteen Dries</p>
              <p className="font-bold">Av. Siempre viva 1233</p>
              <p>Col. Centro</p>
              <p>Alcaldía Cuauhtémoc</p>
              <p>Ciudad de México</p>
              <p>06760</p>
              <p>123 123 123</p>
            </div>

            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Confirmación de la órden</h2>
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
              <p className="mb-5">
                <span className="text-xs">
                  Al hacer clic en "Colocar órden", aceptas los <Link className="underline" href="/terms">Términos y condiciones</Link> y la <Link className="underline" href="/privacy">Política de privacidad</Link> de este sitio.
                </span>
              </p>
              <Link className="flex btn-primary justify-center" href="/orders/123">
                Colocar órden
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}