export const revalidate = 604800; // 7 days = (60 * 60 * 24 * 7)
import { getProductBySlug } from "@/actions/products/get-product-by-slug";
import { MobileSlideshow } from "@/components/product/slideshow/MobileSlideshow";
import { Slideshow } from "@/components/product/slideshow/Slideshow";
import { StockLabel } from "@/components/product/stock-label/StockLabel";
import { titleFont } from "@/config/fonts";
import { ResolvingMetadata, type Metadata } from "next";
// import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";

interface Props {
  params:{
    slug: string;
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;
 
  // fetch data
  const product = await await getProductBySlug(slug);
 
  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? '',
      images:[`/products/${product?.images[1]}`],
    },
  }
}

export default async function ProductPage({params}:Props) {
  const {slug} = params;
  // const product = initialData.products.find(product => product.slug === slug);
  const product = await getProductBySlug(slug);

  if(!product) return notFound();

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* Slideshow */}
      <div className="col-span-1 md:col-span-2">
        {/* Mobile slideshow */}
        <MobileSlideshow title={product.title} images={product.images} className="block md:hidden" />
        {/* Desktop slideshow */}
        <Slideshow title={product.title} images={product.images} className="hidden md:block" />
      </div>

      {/* Detalles */}
      <div className="col-span-1 px-5">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <StockLabel slug={product.slug} />
        <p className="text-lg mb-5">$ {product.price}</p>

        <AddToCart product={product} />

        {/* Descripción */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">
          {product.description}
        </p>
      </div>
    </div>
  );
}