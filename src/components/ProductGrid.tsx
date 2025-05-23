'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ProductCard } from '@/lib/datocms';
import styles from '@/styles/Products.module.scss';

interface ProductGridProps {
  products: ProductCard[];
}

export default function ProductGrid({ products }: ProductGridProps) {
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
                  quality={100} // hærri gæði en default (75)
                  placeholder="blur"
                  blurDataURL="/placeholder.png"
                  priority={i < 4}
                  unoptimized={false} // leyfa Next.js optimera
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
