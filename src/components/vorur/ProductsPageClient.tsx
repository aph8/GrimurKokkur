// src/components/ProductsPageClient.tsx
'use client';

import React, { useState, useMemo, memo } from 'react';
import type { ProductCard } from '@/lib/datocms';
import ProductGrid from './ProductGrid';
import styles from '@/styles/Products.module.scss';

interface ProductsPageClientProps {
  products: ProductCard[];
}

function ProductsPageClient({ products }: ProductsPageClientProps) {
  const [veganOnly, setVeganOnly] = useState(false);

  const displayed = useMemo(
    () => (veganOnly ? products.filter((p) => p.vegan) : products),
    [veganOnly, products],
  );

  return (
    <>
      <div className={styles.headerRow}>
        <h1 id="pageTitle" className={styles.title}>
          Vörur
        </h1>
        <div className={styles.veganToggleContainer}>
          <label className={styles.veganToggle}>
            <input
              type="checkbox"
              checked={veganOnly}
              onChange={(e) => setVeganOnly(e.currentTarget.checked)}
            />
            Vegan vörur
          </label>
        </div>
      </div>
      <ProductGrid products={displayed} />
    </>
  );
}

export default memo(ProductsPageClient);
