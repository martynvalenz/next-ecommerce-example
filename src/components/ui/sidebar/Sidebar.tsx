'use client';
import { IoCloseOutline, IoSearchOutline } from 'react-icons/io5'

export const Sidebar = () => {
  return (
    <div>
      {/* Background gray */}
      <div className="fixed top-0 left-0 w-screen z-10 bg-black opacity-30"/>
      {/* Blurrrr */}
      <div className='fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm'/>
      {/* SideBar */}
      <nav className="fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300">
        <IoCloseOutline size={50} className="absoulte top-5 right-5 cursor-pointer" onClick$={() => console.log('algo')} />
        <div className='mt-14 relative'>
          <IoSearchOutline size={20} className="absolute top-2 left-3 text-gray-400" />
          <input type="text" placeholder='Buscar' className='' />
        </div>
      </nav>
    </div>
  )
}
