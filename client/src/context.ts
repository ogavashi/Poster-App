import { createContext, useContext } from "react";

export type GlobalContent = {
  postValue: string;
  replyValue: string;
  isVisible: boolean;
  postId: string;
  searchValue: string;
  sortBy: string;
  sortOrder: string;
  setPostId: (postId: string) => void;
  setPostValue: (c: string) => void;
  setReplyValue: (c: string) => void;
  setIsVisible: (c: boolean) => void;
  setSearchValue: (c: string) => void;
  setSortBy: (sortBy: string) => void;
  setSortOrder: (sortOrder: string) => void;
};
export const AppContext = createContext<GlobalContent>({
  postValue: "", // set a default value
  replyValue: "",
  isVisible: false,
  postId: "",
  searchValue: "",
  sortBy: "",
  sortOrder: "",
  setSearchValue: () => {},
  setPostId: () => {},
  setPostValue: () => {},
  setReplyValue: () => {},
  setIsVisible: () => {},
  setSortBy: () => {},
  setSortOrder: () => {},
});
export const useGlobalContext = () => useContext(AppContext);
