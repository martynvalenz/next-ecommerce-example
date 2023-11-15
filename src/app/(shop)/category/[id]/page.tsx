import { notFound } from "next/navigation";

interface Props {
  params:{
    id: string;
  }
}
export default function CheckoutPage({params}:Props) {
  const {id} = params;
  if(id == 'kids'){
    notFound();
  }
  
  return (
    <div>
      <h1>

      </h1>
    </div>
  );
}