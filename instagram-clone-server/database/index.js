import Sequelize from 'sequelize';
import { user } from './models/User.js';
import { post } from './models/Post.js';
import { commentOnPost } from './models/Comment.js';
import { likeOnPost } from './models/Like.js';
import { replyToComment } from './models/ReplyToComment.js';
import { follower } from './models/Follower.js';
import { notification } from './models/Notification.js';
import { setModelRelationships } from './setup.js';
import dotenv from "dotenv";


dotenv.config();

const DB = new Sequelize(
    `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}
        @${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);


user(DB);
post(DB);
commentOnPost(DB);
likeOnPost(DB);
follower(DB);
replyToComment(DB);
notification(DB);

setModelRelationships(DB);


await DB.sync({ logging: false });




export default DB;