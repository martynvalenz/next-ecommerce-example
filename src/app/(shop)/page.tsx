export const revalidate = 60;

import { getPaginatedProductsWithImages } from '@/actions/products/product-pagination';
import { Title } from '@/components'
import { ProductGrid } from '@/components/products/ProductGrid';
import { Pagination } from '@/components/ui/pagination/Pagination';
import { redirect } from 'next/navigation';
// import { initialData } from '@/seed/seed';

// const products = initialData.products;
interface Props {
  searchParams:{
    page?:string;
  }
}

export default async function Home({searchParams}:Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const {products, totalPages} = await getPaginatedProductsWithImages({page});
  if(products.length == 0){
    redirect('/');
  }

  return (
    <>
      <Title title="Tienda" subtitle='Todos los productos' className='mb-2' />

      <Pagination totalPages={totalPages} />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  )
}
