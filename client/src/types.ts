export type Post = {
  id: string;
  likes: number;
  dislikes: number;
  text: string;
  createdAt: string;
  replies: Reply[];
};

export type PostsList = {
  postsList: Post[];
};

export type Reply = {
  id: string;
  likes: number;
  dislikes: number;
  text: string;
};

export type ReplyList = {
  repliesList: Reply[];
};
