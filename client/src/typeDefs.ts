import { gql } from "@apollo/client";

export const typeDefs = gql`
  enum Sort {
    asc
    desc
  }
  input PostOrderByInput {
    title: Sort
    id: Sort
  }

  input PostInput {
    text: String!
    likes: Int! = 0
    dislikes: Int! = 0
  }

  input ReviewInput {
    text: String!
    productId: Int!
  }
`;
