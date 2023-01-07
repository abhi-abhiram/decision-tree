import "reflect-metadata";
import { ApolloServer } from "apollo-server-micro";
import type { NextApiHandler, PageConfig } from "next";
import { buildSchema } from "type-graphql";
import { connectDB } from "@/utils/connectDB";
import Cors from "micro-cors";
import { resolvers } from "@/graphql/resolvers";

const schema = await buildSchema({
  resolvers,
  validate: false,
});

const cors = Cors();

const apolloServer = new ApolloServer({
  schema,
});

const startServer = apolloServer.start();

const handler: NextApiHandler = cors(async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://studio.apollographql.com"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }
  await connectDB();
  await startServer;

  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
});

export default handler;

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};
