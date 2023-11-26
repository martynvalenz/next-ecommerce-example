'use client';
import { titleFont } from '@/config/fonts';
import { useUiStore } from '@/store/ui/ui.store';
import Link from 'next/link';
import React from 'react';
import { IoSearchOutline, IoCartOutline } from 'react-icons/io5';

export const TopMenu = () => {
  const openSideMenu = useUiStore(state => state.openSideMenu);

  return (
    <nav className="flex px-5 justify-between items-center w-full py-2">
      {/* Logo */}
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>Teslo</span>
          <span> | Shop</span>
        </Link>
      </div>
      <div className="hidden sm:block">
        <Link href="/category/men" className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'>
          Onvres
        </Link>
        <Link href="/category/women" className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'>
          Machorras
        </Link>
        <Link href="/category/kid" className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'>
          Niñes
        </Link>
      </div>
      {/* Search, Cart, Menu */}
      <div className="flex items-center gap-x-3">
        <Link href="/search">
          <IoSearchOutline className="w-6 h-6" />
        </Link>
        <Link href="/cart">
          <div className="relative">
            <span className="absolute text-xs rounded-full px-1 font-bold -top-2 bg-blue-700 text-white -right-2">3</span>
            <IoCartOutline className="w-6 h-6" />
          </div>
        </Link>

        <button className="p-2 rounded-md transition-all hover:bg-gray-100" onClick={openSideMenu}>
          Menú
        </button>
      </div>
    </nav>
  )
}
