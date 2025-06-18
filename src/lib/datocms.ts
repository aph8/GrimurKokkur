import { gql } from 'graphql-request';
import { fetchDatoCMS } from './fetchDatoCMS';

export interface ProductCard {
  slug: string;
  title: string;
  image?: {
    url: string;
    alt?: string;
    blurUpThumb?: string;
  };
  vegan?: boolean;
}

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

export interface AboutSection {
  slug: string;
  title: string;
  discription?: string;
  image?: {
    url: string;
    alt?: string;
    blurUpThumb?: string;
  };
  imagegallery?: Array<{
    url: string;
    alt?: string;
    blurUpThumb?: string;
  }>;
  video?: { url: string };
}

const ALL_PRODUCTS_QUERY = gql`
  query AllProducts {
    allProducts(orderBy: title_ASC) {
      slug
      title
      vegan
      image {
        url( imgixParams: { auto: format, q: 100 } )
        alt
        blurUpThumb
      }
    }
  }
`;

/** Fetches all products sorted by title. */
export async function getAllProducts(): Promise<ProductCard[] | null> {
  try {
    const { allProducts } = await fetchDatoCMS<{ allProducts: ProductCard[] }>(ALL_PRODUCTS_QUERY);
    return allProducts;
  } catch {
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
        url( imgixParams: { auto: format, q: 100 } )
        alt
      }
      imagegallery {
        url( imgixParams: { auto: format, q: 100 } )
        alt
      }
      video {
        url
      }
    }
  }
`;
/** Fetches a single product by slug. */

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const { product } = await fetchDatoCMS<{ product: Product }>(PRODUCT_BY_SLUG_QUERY, { slug });
    return product;
  } catch {
    return null;
  }
}

const ALL_ABOUT_QUERY = gql`
  query AllAboutSections {
    allAbouts {
      slug
      title
      discription
      image {
        url( imgixParams: { auto: format, q: 100 } )
        alt
        blurUpThumb
      }
      imagegallery {
        url( imgixParams: { auto: format, q: 100 } )
        alt
        blurUpThumb
      }
      video {
        url
      }
    }
  }
`;

export async function getAllAboutSections(): Promise<AboutSection[] | null> {
  try {
    const { allAbouts } = await fetchDatoCMS<{ allAbouts: AboutSection[] }>(ALL_ABOUT_QUERY);
    return allAbouts;
  } catch {
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
        url( imgixParams: { auto: format, q: 100 } )
        alt
        blurUpThumb
      }
      imagegallery {
        url( imgixParams: { auto: format, q: 100 } )
        alt
        blurUpThumb
      }
      video {
        url
      }
    }
  }
`;

export async function getAboutBySlug(slug: string): Promise<AboutSection | null> {
  try {
    const { about } = await fetchDatoCMS<{ about: AboutSection }>(ABOUT_BY_SLUG_QUERY, { slug });
    return about;
  } catch {
    return null;
  }
}