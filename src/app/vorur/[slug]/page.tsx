// src/app/vorur/[slug]/page.tsx
export const revalidate = false;
export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, type Product } from '@/lib/datocms';
import TextSection from '@/components/vorur/TextSection';
import NutritionTable, { type NutritionRow } from '@/components/vorur/NutritionTable';
import PhotoGallery from '@/components/vorur/PhotoGallery';
import HeroImage from '@/components/vorur/HeroImage';
import styles from '@/styles/vorur/ProductLayout.module.scss';

interface PageProps {
  params: Promise<{ slug: string }>;
}
/**
 * Generates page metadata for a specific product.
 */

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Vara ekki fundin – Grímur Kokkur',
      description: 'Fann enga vöru með þessu slug.',
    };
  }

  return {
    title: `${product.title} – Grímur Kokkur`,
    description: (product.discription?.slice(0, 157) ?? `Upplýsingar um ${product.title}`) + '…',
    icons: {
      icon: '/Grimur_kokkur_logo.svg',
      shortcut: '/Grimur_kokkur_logo.svg',
      apple: '/Grimur_kokkur_logo.svg',
    },
  };
}
/**
 * Renders a single product page with images and nutrition facts.
 */

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product: Product | null = await getProductBySlug(slug);
  if (!product) return notFound();

  const {
    title,
    discription = '',
    ingredient = '',
    nutritionfacts = [],
    image,
    imagegallery = [],
    video,
  } = product;

  return (
    <main className="w-full px-4 py-12">
      <h1 id="pageTitle" className={styles.pageTitle}>
        {title}
      </h1>

      <div className={styles.wrapper}>
        {image?.url && (
          <div className={styles.heroContainer}>
            <HeroImage
              src={image.url}
              alt={image.alt || title}
              ratio="16:9"
              className="asymmetric"
            />

            {nutritionfacts.length > 0 && (
              <div className={styles.desktopOnly}>
                <NutritionTable data={nutritionfacts as NutritionRow[]} />
              </div>
            )}

            {video?.url && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-2">Myndband</h2>
                <iframe
                  src={video.url}
                  title="Myndband"
                  className="w-full h-64 rounded"
                  allowFullScreen
                />
              </div>
            )}

            {imagegallery.length > 0 && (
              <div className="mt-8">
                <TextSection title="Myndagallerí">
                  <PhotoGallery
                    images={imagegallery}
                    imageSizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                    imageQuality={100}
                  />
                </TextSection>
              </div>
            )}
          </div>
        )}

        <div className={styles.contentContainer}>
          {discription && <TextSection title="Lýsing" text={discription} isMarkdown />}
          {ingredient && <TextSection title="Innihaldsefni" text={ingredient} isMarkdown />}

          {nutritionfacts.length > 0 && (
            <div className={styles.mobileOnly}>
              <TextSection title="Næringargögn">
                <NutritionTable data={nutritionfacts as NutritionRow[]} />
              </TextSection>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
