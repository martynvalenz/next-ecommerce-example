export const revalidate = 60;

import { getPaginatedProductsWithImages } from "@/actions/products/product-pagination";
import { Title } from "@/components";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Pagination } from "@/components/ui/pagination/Pagination";
import { Gender } from "@prisma/client";
import { notFound, redirect } from "next/navigation";

// const seedProducts = initialData.products;

interface Props {
  params:{
    gender:string;
  },
  searchParams:{
    page?:string;
  }
}

export default async function CheckoutPage({params, searchParams}:Props) {
  const {gender} = params;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const {products, currentPage, totalPages} = await getPaginatedProductsWithImages({page, gender:gender as Gender});
  if(products.length == 0){
    redirect('/');
  }
  // const products = seedProducts.filter(product => product.gender === gender);
  const labels:Record<string,string> = {
    'men': 'Hombres',
    'women': 'Machorras',
    'kid': 'Niñes',
    'unisex': 'Todes'
  }

  // if(gender === 'kids'){
  //   notFound();
  // }
  
  return (
    <>
      <Title title={`Artículos de ${labels[gender]}`} subtitle='Todos los productos' className='mb-2' />

      <Pagination totalPages={totalPages} />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}