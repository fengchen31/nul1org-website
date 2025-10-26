const domain = process.env.SHOPIFY_STORE_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

async function ShopifyData(query: string) {
  if (!domain || !storefrontAccessToken) {
    console.error('Missing Shopify credentials:', {
      domain: domain ? 'set' : 'missing',
      token: storefrontAccessToken ? 'set' : 'missing'
    });
    throw new Error("Shopify credentials not configured");
  }

  const URL = `https://${domain}/api/2024-01/graphql.json`;

  const options = {
    method: "POST" as const,
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  };

  try {
    const response = await fetch(URL, options);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Shopify API error:', response.status, errorText);
      throw new Error(`Shopify API returned ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      throw new Error("GraphQL query failed");
    }

    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export async function getProductsInCollection(collectionHandle: string = 'all') {
  const query = `
    {
      collection(handle: "${collectionHandle}") {
        title
        products(first: 25) {
          edges {
            node {
              id
              title
              handle
              description
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 5) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await ShopifyData(query);

  const allProducts = response.data?.collection?.products?.edges || [];

  return allProducts;
}

export async function getAllCollections() {
  const query = `
    {
      collections(first: 10) {
        edges {
          node {
            handle
            title
          }
        }
      }
    }
  `;

  const response = await ShopifyData(query);

  const collections = response.data.collections.edges
    ? response.data.collections.edges
    : [];

  return collections;
}

export async function getProduct(handle: string) {
  const query = `
    {
      product(handle: "${handle}") {
        id
        title
        handle
        description
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
        options {
          name
          values
        }
        variants(first: 25) {
          edges {
            node {
              selectedOptions {
                name
                value
              }
              image {
                url
                altText
              }
              title
              id
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  const response = await ShopifyData(query);

  const product = response.data.product ? response.data.product : [];

  return product;
}
