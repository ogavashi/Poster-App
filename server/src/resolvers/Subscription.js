const newPostSubscribe = (_parent, _args, context) => context.pubsub.subscribe("NEW_POST");

const newReplySubscribe = (_parent, _args, context) => context.pubsub.subscribe("NEW_REPLY");

const newLikePostSubscribe = (_parent, _args, context) => context.pubsub.subscribe("NEW_LIKE_POST");

const newDislikePostSubscribe = (_parent, _args, context) =>
  context.pubsub.subscribe("NEW_DISLIKE_POST");

const newLikeReplySubscribe = (_parent, _args, context) =>
  context.pubsub.subscribe("NEW_LIKE_REPLY");

const newDislikeReplySubscribe = (_parent, _args, context) =>
  context.pubsub.subscribe("NEW_DISLIKE_REPLY");

const newPost = {
  subscribe: newPostSubscribe,
  resolve: (payload) => payload,
};

const newReply = {
  subscribe: newReplySubscribe,
  resolve: (payload) => payload,
};

const newLikePost = {
  subscribe: newLikePostSubscribe,
  resolve: (payload) => payload,
};

const newDislikePost = {
  subscribe: newDislikePostSubscribe,
  resolve: (payload) => payload,
};

const newLikeReply = {
  subscribe: newLikeReplySubscribe,
  resolve: (payload) => payload,
};

const newDislikeReply = {
  subscribe: newDislikeReplySubscribe,
  resolve: (payload) => payload,
};

export const Subscription = {
  newPost,
  newReply,
  newLikePost,
  newDislikePost,
  newLikeReply,
  newDislikeReply,
};
