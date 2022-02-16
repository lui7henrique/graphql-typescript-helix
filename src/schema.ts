import { makeExecutableSchema } from "@graphql-tools/schema";
import typeDefs from "./schema.graphql";
import { Link } from "@prisma/client";
import { GraphQLContext } from "./context";

const resolvers = {
  Query: {
    info: () => "oiiiiiii",
    feed: async (parent: unknown, args: {}, context: GraphQLContext) => {
      return context.prisma.link.findMany();
    },
  },
  Link: {
    id: (parent: Link) => parent.id,
    description: (parent: Link) => parent.description,
    url: (parent: Link) => parent.url,
  },
  Mutation: {
    post: async (
      parent: unknown,
      args: { description: string; url: string },
      context: GraphQLContext
    ) => {
      // 1
      const newLink = context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description,
        },
      });

      return newLink;
    },
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
