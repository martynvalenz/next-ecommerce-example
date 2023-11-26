'use client';
import React, { useState } from 'react'
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';

interface Props {
  quantity:number;
}

export const QuantitySelector = ({quantity}:Props) => {
  const [count, setCount] = useState(quantity);
  const quantityChange = (value:number) => {
    if((count + value) < 1) return;
    setCount(count + value);
  };

  return (
    <div className='flex'>
      <button onClick={() => quantityChange(-1)}>
        <IoRemoveCircleOutline size={30} />
      </button>
      <span className='w-20 mx-3 px-5 py-1 bg-blue-100 text-center text-xl font-bold rounded-md'>
        {count}
      </span>
      <button onClick={() => quantityChange(+1)}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  )
}
