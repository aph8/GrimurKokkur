export const runtime = 'edge';
export const revalidate = false; 
export const dynamic = 'force-static';

import { notFound } from 'next/navigation';
import { getAllProducts, ProductCard } from '@/lib/datocms';
import ProductsPageClient from '@/components/ProductsPageClient';

export default async function VorurPage() {
  const products: ProductCard[] | null = await getAllProducts();
  if (!products) return notFound();

  const sortedProducts = [...products].sort((a, b) =>
    a.title.localeCompare(b.title, 'is', { sensitivity: 'base' }),
  );

  return <ProductsPageClient products={sortedProducts} />;
}
