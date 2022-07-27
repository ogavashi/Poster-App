const replies = (parent, _args, context, _info) =>
  context.prisma.post.findUnique({ where: { id: parent.id } }).replies();

export const Post = { replies };
