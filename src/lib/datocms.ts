// src/lib/datocms.ts

import { GraphQLClient, gql } from 'graphql-request';

const endpoint = 'https://graphql.datocms.com/';
const token = process.env.DATO_API_TOKEN;

if (!token) {
  throw new Error('DATO_API_TOKEN is missing from .env.local');
}

const client = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${token}`,
  },
});

/**
 * Generic fetch helper for arbitrary GraphQL queries
 */
export async function fetchDatoCMS<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  try {
    return await client.request<T>(query, variables);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('DatoCMS error:', err.message);
    } else {
      console.error('DatoCMS error:', String(err));
    }
    throw err;
  }
}

/**
 * Card-style product listing type
 */
export interface ProductCard {
  slug: string;
  title: string;
  image?: {
    url: string;
    alt?: string;
  };
  vegan?: boolean;
}

/**
 * Detailed product type for individual pages
 */
export interface Product {
  title: string;
  discription?: string;
  ingredient?: string;
  category?: string;
  vegan?: boolean;
  nutritionfacts?: Array<{
    label: string;
    value: string;
    subrows?: Array<{ label: string; value: string }>;
  }>;
  image?: { url: string; alt?: string };
  imagegallery?: Array<{ url: string; alt?: string }>;
  video?: { url: string };
}

/**
 * About-section type (your “about” table)
 */
export interface AboutSection {
  slug: string;
  title: string;
  discription?: string;
  image?: { url: string; alt?: string };
  imagegallery?: Array<{ url: string; alt?: string }>;
  video?: { url: string };
}

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCTS

const ALL_PRODUCTS_QUERY = gql`
  query AllProducts {
    allProducts {
      slug
      title
      vegan
      image {
        url
        alt
      }
    }
  }
`;

export async function getAllProducts(): Promise<ProductCard[] | null> {
  try {
    const { allProducts } = await client.request<{ allProducts: ProductCard[] }>(
      ALL_PRODUCTS_QUERY
    );
    return allProducts;
  } catch (err: unknown) {
    console.error('Error fetching all products:', err instanceof Error ? err.message : String(err));
    return null;
  }
}

const PRODUCT_BY_SLUG_QUERY = gql`
  query ProductBySlug($slug: String!) {
    product(filter: { slug: { eq: $slug } }) {
      title
      discription
      ingredient
      category
      vegan
      nutritionfacts {
        label
        value
        subrows {
          label
          value
        }
      }
      image {
        url
        alt
      }
      imagegallery {
        url
        alt
      }
      video {
        url
      }
    }
  }
`;

export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  try {
    const { product } = await client.request<{ product: Product }>(
      PRODUCT_BY_SLUG_QUERY,
      { slug }
    );
    return product;
  } catch (err: unknown) {
    console.error('Error fetching product by slug:', err instanceof Error ? err.message : String(err));
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ABOUT SECTIONS

const ALL_ABOUT_QUERY = gql`
  query AllAboutSections {
    allAbouts {
      slug
      title
      discription
      image {
        url
        alt
      }
      imagegallery {
        url
        alt
      }
      video {
        url
      }
    }
  }
`;

export async function getAllAboutSections(): Promise<AboutSection[] | null> {
  try {
    const { allAbouts } = await client.request<{ allAbouts: AboutSection[] }>(
      ALL_ABOUT_QUERY
    );
    return allAbouts;
  } catch (err: unknown) {
    console.error('Error fetching all about sections:', err instanceof Error ? err.message : String(err));
    return null;
  }
}

const ABOUT_BY_SLUG_QUERY = gql`
  query AboutBySlug($slug: String!) {
    about(filter: { slug: { eq: $slug } }) {
      slug
      title
      discription
      image {
        url
        alt
      }
      imagegallery {
        url
        alt
      }
      video {
        url
      }
    }
  }
`;

export async function getAboutBySlug(
  slug: string
): Promise<AboutSection | null> {
  try {
    const { about } = await client.request<{ about: AboutSection }>(
      ABOUT_BY_SLUG_QUERY,
      { slug }
    );
    return about;
  } catch (err: unknown) {
    console.error('Error fetching about by slug:', err instanceof Error ? err.message : String(err));
    return null;
  }
}
