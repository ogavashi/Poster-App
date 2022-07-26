const createProduct = async (_parent, args, context) =>
  context.prisma.product.create({ data: args.product });

export const Mutation = { createProduct };
