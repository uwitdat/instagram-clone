import DB from "../database/index.js";
import pkg from 'graphql-iso-date';
const { GraphQLDateTime } = pkg;

export const resolvers = {
  Query: {
    users: () => {
      return DB.models.user.findAll()
    },
    user: (_, args) => {
      return DB.models.user.findByPk(args.id)
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
  Mutation: {
    createUser: (_, args) => {
      const newUser = args.input;
      return DB.models.user.create({
        name: newUser.name,
        userName: newUser.userName,
      });
    },
    createPost: async (_, args) => {
      const newPost = args.input;

      return DB.models.post.create({
        postContent: newPost.postContent,
        postDescription: newPost.postDescription,
        userId: newPost.userId
      })

    }
  },
  Date: GraphQLDateTime
}

