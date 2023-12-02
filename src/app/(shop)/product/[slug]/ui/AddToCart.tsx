'use client';
import { QuantitySelector } from '@/components/product/quantity-selector/QuantitySelector'
import { SizeSelector } from '@/components/product/size-selector/SizeSelector'
import { CartItem, Product, Size } from '@/interfaces';
import { useCartStore } from '@/store/cart/cart.store';
import { useState } from 'react';

interface Props {
  product: Product;
}


export const AddToCart = ({product}:Props) => {
  const addProductToCart = useCartStore(state => state.addProductToCart);
  const [size, setSize] = useState<Size|undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);
    if(!size) return;
    
    const cartProduct:CartItem = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity,
      size,
      image: product.images[0],
    }
    addProductToCart(cartProduct);
    setPosted(false);
    setQuantity(1);
    setSize(undefined);
  }

  return (
    <>
      {
        posted && !size && (
          <span className='mt-2 text-red-500 fade-in transition-all'>
            Debe de seleccionar una talla*
          </span>
        )
      }
      {/* Selector de tallas */}
      <SizeSelector selectedSize={size} availableSizes={product.sizes} onSizeChanged={setSize} />

      {/* Selector de cantidad */}
      <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />

      {/* Botón de agregar al carrito */}
      <button className="btn-primary my-5" onClick={addToCart}>Agregar al carrito</button>
    </>
  )
}
