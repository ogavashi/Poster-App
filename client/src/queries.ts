import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query getPosts($orderBy: PostOrderByInput!, $filter: String, $skip: Int, $take: Int) {
    posts(orderBy: $orderBy, filter: $filter, skip: $skip, take: $take) {
      postsList {
        id
        text
        likes
        dislikes
        createdAt
        replies {
          id
          text
          likes
          dislikes
        }
      }
      count
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost($post: PostInput!) {
    createPost(post: $post) {
      id
      text
    }
  }
`;

export const CREATE_REPLY = gql`
  mutation createReply($reply: ReplyInput!) {
    createReply(reply: $reply) {
      id
      text
      likes
      dislikes
    }
  }
`;

export const LIKE_POST = gql`
  mutation likePost($id: String!) {
    likePost(id: $id) {
      text
      likes
    }
  }
`;

export const DISLIKE_POST = gql`
  mutation dislikePost($id: String!) {
    dislikePost(id: $id) {
      text
      dislikes
    }
  }
`;

export const LIKE_REPLY = gql`
  mutation likeReply($id: String!) {
    likeReply(id: $id) {
      likes
    }
  }
`;

export const DISLIKE_REPLY = gql`
  mutation dislikeReply($id: String!) {
    dislikeReply(id: $id) {
      dislikes
    }
  }
`;

export const NEW_POST = gql`
  subscription newPost {
    newPost {
      id
      text
      likes
      dislikes
      createdAt
      replies {
        id
        text
        likes
        dislikes
      }
    }
  }
`;

export const NEW_LIKE_POST = gql`
  subscription newLikePost {
    newLikePost {
      id
      likes
    }
  }
`;

export const NEW_DISLIKE_POST = gql`
  subscription newDislikePost {
    newDislikePost {
      id
      dislikes
    }
  }
`;

export const NEW_LIKE_REPLY = gql`
  subscription newLikeReply {
    newLikeReply {
      id
      likes
    }
  }
`;

export const NEW_DISLIKE_REPLY = gql`
  subscription newDislikeReply {
    newDislikeReply {
      id
      dislikes
    }
  }
`;
