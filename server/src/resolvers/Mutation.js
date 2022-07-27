const createPost = async (_parent, args, context) => {
  const createdPost = await context.prisma.post.create({ data: args.post });
  context.pubsub.publish("NEW_POST", createdPost);
  return createdPost;
};

const createReply = async (_parent, args, context) => {
  const {
    reply: { text, likes, dislikes, postId },
  } = args;

  const isPostExists = await context.prisma.post
    .findFirst({
      where: {
        id: postId,
      },
      select: { id: true },
    })
    .then(Boolean);

  if (!isPostExists) {
    throw new Error(`Product with id ${postId} does not exist`);
  }

  const createdReply = await context.prisma.reply.create({
    data: {
      text,
      likes,
      dislikes,
      post: {
        connect: { id: postId },
      },
    },
  });

  context.pubsub.publish("NEW_REPLY", createdReply);

  return createdReply;
};

const likePost = async (_parent, args, context) => {
  const { id } = args;
  const isPostExists = await context.prisma.post.findFirst({
    where: {
      id: id,
    },
    select: { id: true, text: true },
  });
  if (!isPostExists) {
    throw new Error(`Post with id ${id} does not exist`);
  }

  const likedPost = await context.prisma.post.update({
    where: { id: id },
    data: {
      likes: { increment: 1 },
    },
  });
  context.pubsub.publish("NEW_LIKE_POST", likedPost);

  return likedPost;
};

const dislikePost = async (_parent, args, context) => {
  const { id } = args;
  const isPostExists = await context.prisma.post.findFirst({
    where: {
      id: id,
    },
    select: { id: true, text: true },
  });
  if (!isPostExists) {
    throw new Error(`Post with id ${id} does not exist`);
  }

  const dislikedPost = await context.prisma.post.update({
    where: { id: id },
    data: {
      dislikes: { increment: 1 },
    },
  });

  context.pubsub.publish("NEW_DISLIKE_POST", dislikedPost);

  return dislikedPost;
};

const likeReply = async (_parent, args, context) => {
  const { id } = args;
  const isReplyExists = await context.prisma.reply.findFirst({
    where: {
      id: id,
    },
    select: { id: true, text: true },
  });
  if (!isReplyExists) {
    throw new Error(`Reply with id ${id} does not exist`);
  }

  const likedReply = await context.prisma.reply.update({
    where: { id: id },
    data: {
      likes: { increment: 1 },
    },
  });
  context.pubsub.publish("NEW_LIKE_REPLY", likedReply);

  return likedReply;
};

const dislikeReply = async (_parent, args, context) => {
  const { id } = args;
  const isReplyExists = await context.prisma.reply.findFirst({
    where: {
      id: id,
    },
    select: { id: true, text: true },
  });
  if (!isReplyExists) {
    throw new Error(`Reply with id ${id} does not exist`);
  }

  const dislikedReply = await context.prisma.reply.update({
    where: { id: id },
    data: {
      dislikes: { increment: 1 },
    },
  });
  context.pubsub.publish("NEW_DISLIKE_REPLY", dislikedReply);

  return dislikedReply;
};

export const Mutation = { createPost, createReply, likePost, dislikePost, likeReply, dislikeReply };
