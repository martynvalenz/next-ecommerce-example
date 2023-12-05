import { CartItem } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart:CartItem[];
  getTotalItems:() => number;
  getSummaryInfo: () => {
    subTotal: number;
    tax: number;
    total: number;
    items: number;
  };
  addProductToCart: (item:CartItem) => void;
  updateProductQuantity: (product:CartItem, quantity:number) => void;
  removeProductFromCart: (product:CartItem) => void;
  clearCart: () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      getTotalItems: () => {
        const {cart} = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },
      getSummaryInfo: () => {
        const {cart, getTotalItems} = get();
        const subTotal = cart.reduce((sub, item) => sub + (item.quantity * item.price), 0);
        const tax = subTotal * 0.16;
        const total = subTotal + tax;
        return {subTotal, tax, total, items:getTotalItems()};
      },
      addProductToCart: (item:CartItem) => {
        const {cart} = get();
        // Check if the product exists in the cart
        const productInCart = cart.some(
          (product) => (item.id === product.id && item.size === product.size)
        );
  
        if(!productInCart) {
          set({ cart: [...cart, item] });
          return
        }
  
        const updatedCartProducts = cart.map((product) => {
          if(item.id === product.id && item.size === product.size) {
            return { ...product, quantity: product.quantity + item.quantity }
          }
  
          return product;
        });
  
        set({ cart: updatedCartProducts });
      },
      updateProductQuantity: (product, quantity) => {
        const {cart} = get();
        const updateCartProducts = cart.map(item => {
          if(item.id === product.id && item.size === product.size) {
            return {...item, quantity}
          }
          return item;
        });

        set({ cart: updateCartProducts });
      },
      removeProductFromCart: (product) => {
        const {cart} = get();
        const updatedCartProducts = cart.filter(
          (item) => (item.id !== product.id || item.size !== product.size)
        );

        set({ cart: updatedCartProducts });
      },
      clearCart: () => set({ cart: [] }),
    }),{
      name:'cart-storage',
    }
  )
);