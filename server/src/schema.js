import { makeExecutableSchema } from "@graphql-tools/schema";
import { Mutation } from "./resolvers/Mutation.js";
import { Query } from "./resolvers/Query.js";
import { Subscription } from "./resolvers/Subscription.js";
import { Post } from "./resolvers/Post.js";
import { Reply } from "./resolvers/Reply.js";

const typeDefs = /* GraphQL */ `
  enum Sort {
    asc
    desc
  }
  input PostOrderByInput {
    title: Sort
    id: Sort
  }

  type Posts {
    postsList: [Post!]!
    count: Int!
  }

  type Query {
    posts(filter: String, skip: Int, take: Int, orderBy: PostOrderByInput): Posts
    replies: [Reply!]!
  }

  input PostInput {
    text: String!
    likes: Int! = 0
    dislikes: Int! = 0
  }

  input ReplyInput {
    text: String!
    postId: String!
    likes: Int! = 0
    dislikes: Int! = 0
  }

  type Mutation {
    createPost(post: PostInput!): Post!
    createReply(reply: ReplyInput!): Reply!
    likePost(id: String!): Post!
    dislikePost(id: String!): Post!
    likeReply(id: String!): Reply!
    dislikeReply(id: String!): Reply!
  }

  type Subscription {
    newPost: Post
    newReply: Reply
    newLikePost: Post
    newDislikePost: Post
    newLikeReply: Post
    newDislikeReply: Post
  }

  type Post {
    id: String!
    text: String!
    likes: Int!
    dislikes: Int!
    replies: [Reply!]!
  }

  type Reply {
    id: String!
    text: String!
    post: Post!
    likes: Int!
    dislikes: Int!
  }
`;

const resolvers = {
  Query,
  Mutation,
  Subscription,
  Reply,
  Post,
};

export const schema = makeExecutableSchema({
  typeDefs: [typeDefs],
  resolvers: [resolvers],
});
