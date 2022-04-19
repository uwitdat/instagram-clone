import express from 'express';
import cors from 'cors';
import http from 'http';
import DB from './database/index.js';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { resolvers } from './schema/resolvers.js';
import { typeDefs } from './schema/type-defs.js';


const app = express();
// app.use(express.json());
const PORT = 5000;

async function assertDatabaseConnectionOk() {
  console.log(`Checking database connection...`);
  try {
    await DB.authenticate();
    console.log('Database connection OK!');
  } catch (error) {
    console.log('Unable to connect to the database:');
    console.log(error.message);
    process.exit(1);
  }
}

async function init(typeDefs, resolvers) {
  await assertDatabaseConnectionOk();

  app.use(cors());

  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`);
}

init(typeDefs, resolvers);