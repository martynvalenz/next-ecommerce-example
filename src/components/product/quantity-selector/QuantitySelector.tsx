'use client';
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';

interface Props {
  quantity:number;
  onQuantityChanged: (quantity:number) => void;
}

export const QuantitySelector = ({quantity,onQuantityChanged}:Props) => {
  // const [count, setCount] = useState(quantity);
  const quantityChange = (value:number) => {
    if((quantity + value) < 1) return;
    onQuantityChanged(quantity + value);
  };

  return (
    <div className='flex'>
      <button onClick={() => quantityChange(-1)}>
        <IoRemoveCircleOutline size={30} />
      </button>
      <span className='w-20 mx-3 px-5 py-1 bg-blue-100 text-center text-xl font-bold rounded-md'>
        {quantity}
      </span>
      <button onClick={() => quantityChange(+1)}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  )
}
