'use client';
import { logout } from '@/actions/auth/logout.actions';
import { useUiStore } from '@/store/ui/ui.store';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from 'react-icons/io5'

export const Sidebar = () => {
  const isSideMenuOpen= useUiStore(state => state.isSideMenuOpen);
  const closeMenu = useUiStore(state => state.closeSideMenu);

  const {data:session} = useSession();
  const isAuthenticated = !!session?.user;

  return (
    <div>
      {/* Background gray */}
      {
        isSideMenuOpen && (
          <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"/>
        )
      }
      {/* Blurrrr */}
      {
        isSideMenuOpen && (
          <div onClick={closeMenu} className='fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm'/>
        )
      }
      {/* SideBar */}
      <nav className={clsx('fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300',{
        'translate-x-full': !isSideMenuOpen
      })}>

        <IoCloseOutline size={50} className="absoulte top-5 right-5 cursor-pointer" onClick={closeMenu} />
        <div className='mt-14 relative'>
          <IoSearchOutline size={20} className="absolute top-2 left-3 text-gray-400" />
          <input type="text" placeholder='Buscar' className='w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500' />
        </div>

        {
          isAuthenticated && (
            <>
              <Link href="/profile" onClick={() => closeMenu()} className='flex items-ceter mt-10 p-2 hover:bg-gray-100 rounded transition-all'>
                <IoPersonOutline size={30} />
                <span className='ml-3 text-xl'>Perfil</span>
              </Link>
              <Link href="/orders" onClick={() => closeMenu()} className='flex items-ceter mt-10 p-2 hover:bg-gray-100 rounded transition-all'>
                <IoTicketOutline size={30} />
                <span className='ml-3 text-xl'>Mis Órdenes</span>
              </Link>
            </>
          )
        }
        {
          isAuthenticated ? (
            <button onClick={() => logout()} className='flex w-full items-ceter mt-10 p-2 hover:bg-gray-100 rounded transition-all'>
              <IoLogOutOutline size={30} />
              <span className='ml-3 text-xl'>Salir</span>
            </button>
          ):(
            <Link href="/auth/login" onClick={() => closeMenu()}  className='flex items-ceter mt-10 p-2 hover:bg-gray-100 rounded transition-all'>
              <IoLogInOutline size={30} />
              <span className='ml-3 text-xl'>Ingresar</span>
            </Link>
          )
        }
        {
          isAuthenticated && session?.user.role === 'admin' && (
            <>
              <div className='w-full h-px bg-gray-200 my-10'></div>
              <Link href="/" className='flex items-ceter mt-10 p-2 hover:bg-gray-100 rounded transition-all'>
                <IoShirtOutline size={30} />
                <span className='ml-3 text-xl'>Productos</span>
              </Link>
              <Link href="/" className='flex items-ceter mt-10 p-2 hover:bg-gray-100 rounded transition-all'>
                <IoTicketOutline size={30} />
                <span className='ml-3 text-xl'>Órdenes</span>
              </Link>
              <Link href="/" className='flex items-ceter mt-10 p-2 hover:bg-gray-100 rounded transition-all'>
                <IoPeopleOutline size={30} />
                <span className='ml-3 text-xl'>Clientes</span>
              </Link>
            </>
          )
        }
      </nav>
    </div>
  )
}
