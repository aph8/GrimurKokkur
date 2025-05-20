'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ProductCard } from '@/lib/datocms';
import styles from '@/styles/Products.module.scss';

interface ProductGridProps {
  products: ProductCard[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [veganOnly, setVeganOnly] = useState(false);

  // filter on the client
  const displayed = veganOnly
    ? products.filter((p) => p.vegan)
    : products;

  return (
    <>
      <div className={styles.filterBar}>
        <label>
          <input
            type="checkbox"
            checked={veganOnly}
            onChange={(e) => setVeganOnly(e.currentTarget.checked)}
          />{' '}
          Vegan vörur
        </label>
      </div>

      <div className={styles.productList}>
        {displayed.map((product) => (
          <Link
            key={product.slug}
            href={`/vorur/${product.slug}`}
            className={styles.productCard}
          >
            {product.image?.url && (
              <div className={styles.productImageWrapper}>
                <Image
                  src={product.image.url}
                  alt={product.image.alt || product.title}
                  fill
                  className={styles.productImage}
                />
              </div>
            )}
            <h2 className={styles.productTitle}>{product.title}</h2>
          </Link>
        ))}
      </div>
    </>
  );
}