import express from 'express';
import cors from 'cors';
import http from 'http';
import DB from './database/index.js';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { resolvers } from './schema/resolvers.js';
import { typeDefs } from './schema/type-defs.js';
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import { graphqlUploadExpress } from 'graphql-upload';

dotenv.config();


const app = express();
// app.use(express.json());

const PORT = 5000;
const SECRET = process.env.AUTH_SECRET;

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

const addUser = async (req) => {

  const token = req.headers.authorization;
  if (token) {
    try {
      const { user } = await jwt.verify(token, SECRET);
      req.user = user;
    } catch (err) {
      console.log(err)
    }
  } else {
    req.user = null
  }
  req.next()
}
app.use(addUser)

async function init(typeDefs, resolvers) {
  await assertDatabaseConnectionOk();

  app.use(cors('*'));

  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {

      return { SECRET, user: req.user }
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  app.use(graphqlUploadExpress());
  server.applyMiddleware({ app });
  app.use(express.static('../public'));

  await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`);
}

init(typeDefs, resolvers);