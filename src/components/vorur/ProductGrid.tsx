// src/components/ProductGrid.tsx
'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ProductCard } from '@/lib/datocms';
import styles from '@/styles/Products.module.scss';

interface ProductGridProps {
  products: ProductCard[];
}
/**
 * Grid of product cards linking to individual product pages.
 */

function ProductGrid({ products }: ProductGridProps) {
  return (
    <ul className={styles.productList}>
      {products.map((product, i) => (
        <li key={product.slug} className={styles.productCard}>
          <Link href={`/vorur/${product.slug}`}>
            {product.image?.url && (
              <div className={styles.productImageWrapper}>
                <Image
                  src={product.image.url}
                  alt={product.image.alt || product.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 260px"
                  placeholder="blur"
                  blurDataURL={product.image.blurUpThumb || '/placeholder.png'}
                  priority={i < 2}
                  unoptimized={false}
                  quality={100}
                  className={styles.productImage}
                />
              </div>
            )}
            <h2 className={styles.productTitle}>{product.title}</h2>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default memo(ProductGrid);
