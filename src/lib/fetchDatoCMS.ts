// src/lib/fetchDatoCMS.ts
import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_DATOCMS_ENDPOINT;
const token = process.env.DATO_API_TOKEN;

if (!endpoint) {
  throw new Error('NEXT_PUBLIC_DATOCMS_ENDPOINT er ekki stillt í .env');
}
if (!token) {
  throw new Error('DATO_API_TOKEN er ekki stillt í .env');
}

const client = new GraphQLClient(endpoint, {
  headers: { authorization: `Bearer ${token}` },
});
/**
 * Executes a GraphQL request against DatoCMS.
 * @param query - GraphQL query string
 * @param variables - Optional variables for the query
 */

export async function fetchDatoCMS<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  try {
    return await client.request<T>(query, variables);
  } catch (err: unknown) {
    console.error('DatoCMS error:', err);
    throw err;
  }
}
