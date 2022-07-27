const posts = async (_parent, args, context, _info) => {
  const { filter, skip, take, orderBy } = args;

  const where = filter
    ? {
        text: filter,
      }
    : {};

  const postsList = await context.prisma.post.findMany({
    where,
    include: {
      replies: true,
    },
    skip,
    take,
    orderBy,
  });
  const count = await context.prisma.post.count();

  return { postsList, count };
};

export const Query = { posts };
