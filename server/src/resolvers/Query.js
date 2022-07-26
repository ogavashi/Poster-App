const version = () => "1.1.0";

const products = async (_parent, _args, context, _info) => {
  const foudProducts = await context.prisma.product.findMany();
  return foudProducts;
};

export const Query = { version, products };
