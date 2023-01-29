import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-micro';
import type { NextApiHandler, PageConfig } from 'next';
import { buildSchema } from 'type-graphql';
import Cors from 'micro-cors';
import { resolvers } from '@/graphql/resolvers';
import type { GrapqhlContext } from '@/graphql/context';
// import { loaders } from '@/graphql/context';
import { getDatabaseConnection } from '@/utils/connectDB';

const schema = await buildSchema({
  resolvers,
  validate: false,
});

const cors = Cors();

const apolloServer = new ApolloServer({
  schema,
  context: ({ req, res }): GrapqhlContext => {
    return { req, res };
  },
});

const startServer = apolloServer.start();

const handler: NextApiHandler = cors(async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://studio.apollographql.com'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

  await getDatabaseConnection();
  await startServer;

  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
});

export default handler;

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};
