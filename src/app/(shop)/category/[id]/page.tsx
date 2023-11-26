import { Title } from "@/components";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

const seedProducts = initialData.products;

interface Props {
  params:{
    id: Category;
  }
}
export default function CheckoutPage({params}:Props) {
  const {id} = params;
  const products = seedProducts.filter(product => product.gender === id);
  const labels:Record<Category,string> = {
    'men': 'Hombres',
    'women': 'Machorras',
    'kid': 'Niñes',
    'unisex': 'Todes'
  }
  
  return (
    <>
      <Title title={`Artículos de ${labels[id]}`} subtitle='Todos los productos' className='mb-2' />

      <ProductGrid products={products} />
    </>
  );
}