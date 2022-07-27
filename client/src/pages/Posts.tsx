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
import { Post, PostsList, Reply } from "../types";
import PostElement from "../components/PostElement";
import { useContext, useEffect } from "react";
import Modal from "../components/Modal";
import { AppContext } from "../context";
import useDebounce from "../hooks/useDebounce";
import { Pagination } from "../components/Pagination";

const Posts = () => {
  const { isVisible, searchValue, sortBy, sortOrder, setSkip, skip, take, page, setPage } =
    useContext(AppContext);

  const debouncedValue = useDebounce<string>(searchValue);

  const orderBy = sortBy ? { [sortBy]: sortOrder } : {};

  const { loading, error, data, subscribeToMore } = useQuery(GET_POSTS, {
    variables: {
      orderBy: orderBy,
      filter: debouncedValue,
      skip: skip,
      take: take,
    },
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

  const onChangePage = (value: number) => {
    setPage(value);
    const newSkip = take * (value - 1);
    setSkip(newSkip);
  };

  const { postsList }: PostsList = loading || error ? { postsList: [] } : data.posts;

  const posts = postsList.map((post) => <PostElement post={post} key={post.id} />);

  const ITEMS_PER_PAGE = 4;

  const pageAmount = loading || error ? 1 : Math.ceil(data.posts.count / ITEMS_PER_PAGE);

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
      {!loading && !error && posts.length !== 0 && (
        <Pagination currentPage={page} onChangePage={onChangePage} pageCount={pageAmount} />
      )}
      <WritePost />
      {isVisible && <Modal />}
    </div>
  );
};

export default Posts;
