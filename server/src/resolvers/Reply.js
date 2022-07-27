const post = (parent, _args, context, _info) =>
  context.prisma.reply.findUnique({ where: { id: parent.id } }).post();

export const Reply = { post };
