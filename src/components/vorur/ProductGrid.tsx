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

function ProductGrid({ products }: ProductGridProps) {
  return (
    <ul className={styles.productList}>
      {products.map((product, i) => (
        <li key={product.slug} className={styles.productCard}>
          <Link href={`/vorur/${product.slug}`}>
            {/* If there’s an image, render it with LQIP blur and lower quality */}
            {product.image?.url && (
              <div className={styles.productImageWrapper}>
                <Image
                  src={product.image.url}
                  alt={product.image.alt || product.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 260px"
                  // Remove quality={100} so Next.js uses default (75)
                  placeholder="blur"
                  blurDataURL={product.image.blurUpThumb || '/placeholder.png'}
                  // Only preload the first two images
                  priority={i < 2}
                  unoptimized={false} // allow Next.js to optimize
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
