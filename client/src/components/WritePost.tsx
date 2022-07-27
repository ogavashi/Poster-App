import { useMutation } from "@apollo/client";
import React, { useContext } from "react";
import { CREATE_POST, GET_POSTS } from "../queries";
import TextInput from "./TextInput";
import { orderBy } from "../constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../context";

const WritePost = () => {
  const { postValue, setPostValue } = useContext(AppContext);

  const [createPost] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: GET_POSTS, variables: { orderBy } }],
  });

  const handlePostCreate = () => {
    toast.dismiss();
    if (postValue) {
      try {
        toast.loading("Sending message...");
        createPost({
          variables: {
            post: { text: postValue },
          },
        });
      } catch (error) {
        toast.dismiss();
        toast.error("Something went wrong 🤯");
      }
      toast.dismiss();
      toast.success("Success!");
      setPostValue("");
    } else {
      toast.dismiss();
      toast.warning("Can't send empty message...");
    }
  };

  return (
    <div className="write-post">
      <ToastContainer />
      <TextInput />
      <button className="post-button" onClick={handlePostCreate}>
        Send
      </button>
    </div>
  );
};

export default WritePost;
