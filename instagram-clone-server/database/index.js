import Sequelize from 'sequelize';
import { user } from './models/User.js';
import { post } from './models/Post.js';
import { setModelRelationships } from './setup.js';
import dotenv from "dotenv";


dotenv.config();

const DB = new Sequelize(`postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);


user(DB)
post(DB)

setModelRelationships(DB)

await DB.sync({ logging: false });


export default DB;