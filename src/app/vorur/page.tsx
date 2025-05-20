import React from 'react';
import { notFound } from 'next/navigation';
import { getAllProducts, ProductCard } from '@/lib/datocms';
import ProductGrid from '@/components/ProductGrid';
import styles from '../../styles/Products.module.scss';

export default async function VorurPage() {
  // Fetch all products (including their `vegan` flag)
  const products: ProductCard[] | null = await getAllProducts();
  if (!products) return notFound();

  // Sort alphabetically (Icelandic locale, case-insensitive)
  const sortedProducts = [...products].sort((a, b) =>
    a.title.localeCompare(b.title, 'is', { sensitivity: 'base' })
  );

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Vörur</h1>

      {sortedProducts.length === 0 ? (
        <p>Engar vörur fundust.</p>
      ) : (
        /* ProductGrid is a client component that renders
           the “Vegan only” checkbox + filtered grid */
        <ProductGrid products={sortedProducts} />
      )}
    </main>
  );
}
