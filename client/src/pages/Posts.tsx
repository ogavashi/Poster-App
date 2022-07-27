import { useQuery } from "@apollo/client";
import Filters from "../components/Filters";
import WritePost from "../components/WritePost";
import {
  GET_POSTS,
  NEW_DISLIKE_POST,
  NEW_DISLIKE_REPLY,
  NEW_LIKE_POST,
  NEW_LIKE_REPLY,
  NEW_POST,
} from "../queries";
import { orderBy } from "../constants";
import { Post, PostsList, Reply } from "../types";
import PostElement from "../components/PostElement";
import { useContext, useEffect } from "react";
import Modal from "../components/Modal";
import { AppContext } from "../context";

const Posts = () => {
  const { isVisible } = useContext(AppContext);

  const { loading, error, data, subscribeToMore } = useQuery(GET_POSTS, {
    variables: { orderBy },
  });

  useEffect(() => {
    subscribeToMore({
      document: NEW_POST,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        const { newPost } = subscriptionData.data;
        return {
          ...prev,
          posts: {
            ...prev.posts,
            postsList: [{ ...newPost, replies: [] }, ...prev.posts.postsList],
          },
        };
      },
    });

    subscribeToMore({
      document: NEW_LIKE_POST,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }
        const { newLikePost } = subscriptionData.data;
        return {
          ...prev,
          posts: {
            ...prev.posts,
            postsList: prev.posts.postsList.map((p: Post) =>
              p.id === newLikePost.id ? { ...p, likes: newLikePost.likes } : p
            ),
          },
        };
      },
    });

    subscribeToMore({
      document: NEW_DISLIKE_POST,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }
        const { newDislikePost } = subscriptionData.data;
        return {
          ...prev,
          posts: {
            ...prev.posts,
            postsList: prev.posts.postsList.map((p: Post) =>
              p.id === newDislikePost.id ? { ...p, dislikes: newDislikePost.dislikes } : p
            ),
          },
        };
      },
    });

    subscribeToMore({
      document: NEW_LIKE_REPLY,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }
        const { newLikeReply } = subscriptionData.data;

        return {
          ...prev,
          posts: {
            ...prev.posts,
            postsList: prev.posts.postsList.map((p: Post) => {
              return {
                ...p,
                replies: p.replies.map((reply: Reply) =>
                  reply.id === newLikeReply.id ? { ...reply, likes: newLikeReply.likes } : reply
                ),
              };
            }),
          },
        };
      },
    });

    subscribeToMore({
      document: NEW_DISLIKE_REPLY,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }
        const { newDislikeReply } = subscriptionData.data;

        return {
          ...prev,
          posts: {
            ...prev.posts,
            postsList: prev.posts.postsList.map((p: Post) => {
              return {
                ...p,
                replies: p.replies.map((reply: Reply) =>
                  reply.id === newDislikeReply.id
                    ? { ...reply, dislikes: newDislikeReply.dislikes }
                    : reply
                ),
              };
            }),
          },
        };
      },
    });
  }, [subscribeToMore]);

  const { postsList }: PostsList = loading ? { postsList: [] } : data.posts;

  const posts = postsList.map((post) => <PostElement post={post} key={post.id} />);

  return (
    <div className="posts-page">
      <Filters />
      <div className="posts-container">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : error || posts.length === 0 ? (
          <div className="error">No posts available</div>
        ) : (
          posts
        )}
      </div>
      <WritePost />
      {isVisible && <Modal />}
    </div>
  );
};

export default Posts;
