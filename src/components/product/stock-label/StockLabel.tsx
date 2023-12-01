'use client';
import { getStockBySlug } from '@/actions/products/get-stock-by-slug';
import { titleFont } from '@/config/fonts'
import { useEffect, useState } from 'react'

interface Props {
  slug:string;
}

export const StockLabel = ({slug}:Props) => {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getStock();
  }, []);

  const getStock = async () => {
    const inStock = await getStockBySlug(slug);
    setStock(inStock!);
    setIsLoading(false);
  }
  
  return (
    <>
      {
        isLoading
        ? (
          <h1 className={`${titleFont.className} antialiased font-bold text-lg bg-gray-200 animate-pulse w-[200px]`}>
            &nbsp;
          </h1>
        )
        :(
          !isLoading &&
          <h1 className={`${titleFont.className} antialiased font-bold text-lg`}>
            Stock: {stock > 0 ? stock : 'Agotado'}
          </h1>
        )
      }
    </>
  )
}
