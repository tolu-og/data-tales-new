import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection (orderBy: createdAt_DESC)  {
        edges {
          cursor
          node {
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
          
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.postsConnection.edges;
};

export const getPaginatedPosts = async ({ page = 1, pageSize = 10 } = {}) => {
  const skip = (page - 1) * pageSize;
  const query = gql`
    query GetPaginatedPosts($first: Int!, $skip: Int!) {
      postsConnection(orderBy: createdAt_DESC, first: $first, skip: $skip) {
        aggregate { count }
        edges {
          cursor
          node {
            createdAt
            slug
            title
            excerpt
            featuredImage { url }
          }
        }
      }
    }
  `;

  const variables = { first: pageSize, skip };
  const result = await request(graphqlAPI, query, variables);
  const { edges, aggregate } = result.postsConnection;
  return { edges, totalCount: aggregate.count };
};

export const searchPosts = async (q) => {
  const query = gql`
    query SearchPosts($q: String!) {
      postsConnection(orderBy: createdAt_DESC, where: { _search: $q }, first: 50) {
        edges {
          cursor
          node {
            createdAt
            slug
            title
            excerpt
            featuredImage { url }
            content { raw }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { q });
  return result.postsConnection.edges;
};



export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        title
        excerpt
        featuredImage {
          url
        }
        createdAt
        slug
        content {
          raw
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.post;
};













