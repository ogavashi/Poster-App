import { useMutation } from "@apollo/client";
import { FC } from "react";
import { toast } from "react-toastify";
import like from "../assets/images/like.svg";
import { DISLIKE_REPLY, LIKE_REPLY } from "../queries";
import { Reply } from "../types";

type ReplyProps = {
  reply: Reply;
};

const ReplyElement: FC<ReplyProps> = ({ reply }) => {
  const [likeReply] = useMutation(LIKE_REPLY);
  const [dislikeReply] = useMutation(DISLIKE_REPLY);

  const handleLike = () => {
    toast.dismiss();
    try {
      toast.loading("Sending like...");
      likeReply({
        variables: {
          id: reply.id,
        },
      });
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong...");
    }
    toast.dismiss();
    toast.success("Liked reply...", { icon: "😁" });
  };

  const handleDislike = () => {
    toast.dismiss();
    try {
      toast.loading("Sending dislike...");
      dislikeReply({
        variables: {
          id: reply.id,
        },
      });
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong...");
    }
    toast.dismiss();
    toast.success("Disliked reply...", { icon: "😈" });
  };

  return (
    <div className="reply-container">
      <div className="reply-container-top">
        <span className="reply-text">{reply.text}</span>
        <span className="reply-id">#{reply.id.slice(-3)}</span>
      </div>
      <div className="reply-container-bottom">
        <div className="reply-reactions">
          <img onClick={handleLike} src={like} alt="like" className="reply-btn like"></img>
          <span className="like-count">{reply.likes}</span>
          <img onClick={handleDislike} src={like} alt="dislike" className="reply-btn dislike"></img>
          <span className="like-count">{reply.dislikes}</span>
        </div>
      </div>
    </div>
  );
};

export default ReplyElement;
