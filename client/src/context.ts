import { createContext, useContext } from "react";

export type GlobalContent = {
  postValue: string;
  replyValue: string;
  isVisible: boolean;
  postId: string;
  searchValue: string;
  sortBy: string;
  sortOrder: string;
  skip: number;
  take: number;
  page: number;
  setPostId: (postId: string) => void;
  setPostValue: (c: string) => void;
  setReplyValue: (c: string) => void;
  setIsVisible: (c: boolean) => void;
  setSearchValue: (c: string) => void;
  setSortBy: (sortBy: string) => void;
  setSortOrder: (sortOrder: string) => void;
  setSkip: (skip: number) => void;
  setTake: (take: number) => void;
  setPage: (page: number) => void;
};

export const AppContext = createContext<GlobalContent>({
  postValue: "", // set a default value
  replyValue: "",
  isVisible: false,
  postId: "",
  searchValue: "",
  sortBy: "",
  sortOrder: "",
  skip: 0,
  take: 4,
  page: 1,
  setSearchValue: () => {},
  setPostId: () => {},
  setPostValue: () => {},
  setReplyValue: () => {},
  setIsVisible: () => {},
  setSortBy: () => {},
  setSortOrder: () => {},
  setSkip: () => {},
  setTake: () => {},
  setPage: () => {},
});
export const useGlobalContext = () => useContext(AppContext);
