// src/app/vorur/page.tsx
export const revalidate = false;
export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllProducts, type ProductCard } from '@/lib/datocms';
import ProductsPageClient from '@/components/vorur/ProductsPageClient';

export const metadata: Metadata = {
  title: 'Vörur – Grímur Kokkur',
  description: 'Skoðaðu úrval veitinga frá Grímur Kokkur – fiskrétti, forrétti og fleira.',
  icons: {
    icon: '/Grimur_kokkur_logo.svg',
    shortcut: '/Grimur_kokkur_logo.svg',
    apple: '/Grimur_kokkur_logo.svg',
  },
};

export default async function VorurPage() {
  const products: ProductCard[] | null = await getAllProducts();
  if (!products) return notFound();

  const sortedProducts = [...products].sort((a, b) =>
    a.title.localeCompare(b.title, 'is', { sensitivity: 'base' }),
  );

  return <ProductsPageClient products={sortedProducts} />;
}
