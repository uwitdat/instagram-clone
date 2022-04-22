import DB from "../database/index.js";
import pkg from 'graphql-iso-date';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

const { GraphQLDateTime } = pkg;

const checkForUser = (context) => {
  if (context.user) {
    return true
  } else {
    return false
  }
}

export const resolvers = {
  Query: {
    users: (parent, args, context) => {
      if (checkForUser(context)) {
        return DB.models.user.findAll()
      } else {
        throw new Error('You are not authorized')
      }

    },
    user: (_, args, context) => {
      return DB.models.user.findByPk(args.id)
    },
    getAuthedUser: (_, args, context) => {
      if (checkForUser(context)) {
        return DB.models.user.findByPk(context.user.id)
      } else {
        throw new Error('You are not authorized')
      }
    },
    postsByUser: (_, args) => {
      return DB.models.post.findAll({
        where: {
          userId: args.id
        }
      })
    }
  },
  User: {
    posts: (parent, _) => {
      return DB.models.post.findAll({
        where: {
          userId: parent.id
        }
      })
    },
  },
  Post: {
    comments: (parent, _) => {
      return []
    },
  },
  Mutation: {
    updateUser: async (_, args) => {
      const { id } = args.input;
      const user = await DB.models.user.update(
        args.input,
        { where: { id }, returning: true, plain: true }
      );
      return user[1].dataValues;
    },
    deleteUser: async (_, args) => {
      const id = args.id;
      await DB.models.user.destroy({
        where: { id }
      })
      return `User with id of ${id} successfully deleted.`
    },
    deletePost: async (_, args) => {
      const id = args.id;
      await DB.models.post.destroy({
        where: { id }
      })
      return `Post with id of ${id} successfully deleted.`
    },
    createPost: (_, args) => {
      const newPost = args.input;
      return DB.models.post.create({
        postContent: newPost.postContent,
        postDescription: newPost.postDescription,
        userId: newPost.userId
      })
    },
    createAndRegisterUser: async (_, args) => {
      const newUser = args.input;

      const newUserName = args.input.userName
      const user = await DB.models.user.findOne({ where: { userName: newUserName } })
      if (user) {
        throw new Error('A user with that username already exists');
      }

      newUser.password = await bcrypt.hash(newUser.password, 12);

      return DB.models.user.create({
        name: newUser.name,
        userName: newUser.userName,
        password: newUser.password
      });
    },
    loginUser: async (parent, { userName, password }, { SECRET }) => {
      const user = await DB.models.user.findOne({ where: { userName: userName } })
      if (!user) {
        throw new Error('User not found.')
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error('Incorrect Password.')
      }
      const token = jwt.sign(
        { user: _.pick(user, ['id', 'userName']) },
        SECRET,
        { expiresIn: '1y', });

      return token;
    }
  },
  Date: GraphQLDateTime
};

