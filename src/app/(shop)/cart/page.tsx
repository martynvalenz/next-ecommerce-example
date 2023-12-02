import { Title } from "@/components";
import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";
import { CartSummary } from "./ui/CartSummary";

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
            <ProductsInCart />
          </div>
          {/* Checkout */}
          <CartSummary />
        </div>
      </div>
    </div>
  );
}