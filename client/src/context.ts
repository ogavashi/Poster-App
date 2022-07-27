import { createContext, useContext } from "react";
export type GlobalContent = {
  postValue: string;
  replyValue: string;
  isVisible: boolean;
  postId: string;
  setPostId: (postId: string) => void;
  setPostValue: (c: string) => void;
  setReplyValue: (c: string) => void;
  setIsVisible: (c: boolean) => void;
};
export const AppContext = createContext<GlobalContent>({
  postValue: "", // set a default value
  replyValue: "",
  isVisible: false,
  postId: "",
  setPostId: () => {},
  setPostValue: () => {},
  setReplyValue: () => {},
  setIsVisible: () => {},
});
export const useGlobalContext = () => useContext(AppContext);
