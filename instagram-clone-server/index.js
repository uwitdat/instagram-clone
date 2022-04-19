import express from 'express';
import cors from 'cors';
import DB from './database/index.js';
import Schema from './queries/index.js';
import { graphqlHTTP } from 'express-graphql';


const app = express();
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

async function init() {
  await assertDatabaseConnectionOk();

  app.use(cors());
  app.use(express.json());

  app.use('/graphql', graphqlHTTP({
    schema: Schema,
    pretty: true,
    graphiql: true
  }))

  app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));
}

init();


