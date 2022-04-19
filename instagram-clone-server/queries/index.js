import pkg from 'graphql';
import DB from '../database/index.js';
import { User } from './users/schema.js';

const { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLNonNull } = pkg;

const Query = new GraphQLObjectType({
   name: 'Query',
   description: 'Root query',
   fields: () => {
      return {
         users: {
            type: new GraphQLList(User),
            args: {
               id: {
                  type: GraphQLInt
               },
               userName: {
                  type: GraphQLString
               }
            },
            resolve(root, args) {
               return DB.models.user.findAll({ where: args });
            }
         }
      };
   }
});

const Mutation = new GraphQLObjectType({
   name: 'Mutation',
   description: 'Adding new users to DB',
   fields() {
      return {
         addUser: {
            type: User,
            args: {
               name: {
                  type: new GraphQLNonNull(GraphQLString)
               },
               userName: {
                  type: new GraphQLNonNull(GraphQLString)
               },
               bio: {
                  type: GraphQLString
               },
               avatar: {
                  type: GraphQLString
               }
            },
            resolve(root, args) {
               return DB.models.user.create({
                  name: args.name,
                  userName: args.userName,
                  bio: args.bio,
                  avatar: args.avatar
               })
            }
         }
      }
   }
})

const Schema = new GraphQLSchema({
   query: Query,
   mutation: Mutation
});

export default Schema;