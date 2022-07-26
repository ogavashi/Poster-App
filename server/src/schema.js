import { makeExecutableSchema } from "@graphql-tools/schema";
import { Mutation } from "./resolvers/Mutation.js";
import { Query } from "./resolvers/Query.js";

const typeDefs = /* GraphQL */ `
  type Query {
    version: String!
    products: [Product!]!
  }

  input ProductInput {
    title: String!
    price: Float!
  }

  type Mutation {
    createProduct(product: ProductInput!): Product!
  }

  type Product {
    id: String!
    title: String!
    price: Float!
  }
`;

const resolvers = {
  Query: Query,
  Mutation: Mutation,
};

export const schema = makeExecutableSchema({
  typeDefs: [typeDefs],
  resolvers: [resolvers],
});
