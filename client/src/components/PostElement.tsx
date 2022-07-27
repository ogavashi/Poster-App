import { useMutation } from "@apollo/client";
import { FC, useContext } from "react";
import like from "../assets/images/like.svg";
import { DISLIKE_POST, LIKE_POST } from "../queries";
import { Post } from "../types";
import ReplyElement from "./ReplyElement";
import { toast } from "react-toastify";
import { AppContext } from "../context";

type PostProps = {
  post: Post;
};

const PostElement: FC<PostProps> = ({ post }) => {
  const { setIsVisible, setPostId } = useContext(AppContext);

  const replies = post.replies.map((reply) => <ReplyElement reply={reply} key={reply.id} />);

  const [likePost] = useMutation(LIKE_POST);
  const [dislikePost] = useMutation(DISLIKE_POST);

  const handleLike = () => {
    toast.dismiss();
    try {
      toast.loading("Sending like...");
      likePost({
        variables: {
          id: post.id,
        },
      });
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong...");
    }
    toast.dismiss();
    toast.success("Liked post...", { icon: "😁" });
  };

  const handleDislike = () => {
    toast.dismiss();
    try {
      toast.loading("Sending dislike...");
      dislikePost({
        variables: {
          id: post.id,
        },
      });
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong...");
    }
    toast.dismiss();
    toast.success("Disliked post...", { icon: "😈" });
  };

  const handleReply = () => {
    setIsVisible(true);
    setPostId(post.id);
  };

  return (
    <div className="post">
      <div className="post-container">
        <div className="post-container-top">
          <span className="post-text">{post.text}</span>
          <span className="post-id">#{post.id.slice(-3)}</span>
        </div>
        <div className="post-container-bottom">
          <div className="post-reactions">
            <img onClick={handleLike} src={like} alt="like" className="post-btn like"></img>
            <span className="like-count">{post.likes}</span>
            <img
              onClick={handleDislike}
              src={like}
              alt="dislike"
              className="post-btn dislike"
            ></img>
            <span className="like-count">{post.dislikes}</span>
          </div>
          <button onClick={handleReply} className="reply-button">
            Reply
          </button>
        </div>
      </div>
      <div className="replies-container">{replies}</div>
    </div>
  );
};

export default PostElement;
