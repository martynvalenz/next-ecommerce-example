'use client';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import {CreateOrderData, CreateOrderActions} from '@paypal/paypal-js'
import { setTransactionId } from '@/actions/payments/set-transaction-id';

interface Props {
  orderId: string;
  amount: number;
}

export const PaypalButton = ({orderId,amount}:Props) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const roundedAmount = Math.round(amount * 100) / 100;

  if (isPending){
    return (
      <>
        <div className='animate-pulse mb-4'>
          <div className='h-12 bg-gray-300 rounded'></div>
        </div>
        <div className='animate-pulse mb-10'>
          <div className='h-12 bg-gray-300 rounded'></div>
        </div>
      </>
    )
  }

  const createOrder = async(data: CreateOrderData, actions: CreateOrderActions):Promise<string> => {
    const transactionId = await actions.order.create({
      purchase_units: [
        {
          // invoide_id: 'invoice-123',
          amount: {
            value: `${roundedAmount}`,
          },
        },
      ],
    });

    // Dodo: save transactionId to database
    // actions/payments/setTransactionId
    const {ok} = await setTransactionId(orderId, transactionId);

    if(!ok){
      throw new Error('No se pudo actualizar la orden');
    }

    return transactionId;
  }
  
  return (
    <PayPalButtons      
      createOrder={createOrder}
      // onApprove={}
    />
  )
}
