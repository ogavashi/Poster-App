import { useMutation } from "@apollo/client";
import { ChangeEvent, useContext } from "react";
import { AppContext } from "../context";
import { CREATE_REPLY, GET_POSTS } from "../queries";
import { Post } from "../types";
import { toast } from "react-toastify";

const Modal = () => {
  const { setIsVisible, postId, replyValue, setReplyValue, sortBy, sortOrder, searchValue } =
    useContext(AppContext);

  const orderBy = sortBy ? { [sortBy]: sortOrder } : {};

  const updatePostsStore =
    (postId: string) =>
    (cache: any, { data: { createReply } }: any) => {
      const { posts } = cache.readQuery({
        query: GET_POSTS,
        variables: { orderBy, filter: searchValue },
      });

      const updatedPosts = posts.postsList.map((item: Post) => {
        if (item.id === postId) {
          return {
            ...item,
            replies: [...item.replies, createReply],
          };
        }
        return item;
      });

      cache.writeQuery({
        query: GET_POSTS,
        variables: { orderBy },
        data: { posts: { ...posts, postsList: updatedPosts } },
      });
    };

  const [createReply] = useMutation(CREATE_REPLY, {
    update: updatePostsStore(postId),
  });

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setReplyValue(event.target.value);
  };

  const addReply = () => {
    toast.dismiss();
    if (replyValue) {
      try {
        toast.loading("Sending reply...");
        createReply({
          variables: {
            reply: {
              postId: postId,
              text: replyValue,
            },
          },
        });
      } catch (error) {
        toast.dismiss();
        toast.error("Something went wrong 🤯");
      }
      toast.dismiss();
      toast.success("Success!");
      setReplyValue("");
      setIsVisible(false);
    } else {
      toast.dismiss();
      toast.warning("Can't send empty reply...");
    }
  };

  return (
    <div className="modal">
      <span onClick={() => setIsVisible(false)} className="modal-close">
        ✖
      </span>
      <h3 className="modal-title">Write reply</h3>
      <input
        value={replyValue}
        onChange={onChangeInput}
        type="text"
        className="reply-input"
        placeholder="Enter your reply..."
      />
      <button onClick={addReply} className="send-reply">
        Send reply
      </button>
    </div>
  );
};

export default Modal;
