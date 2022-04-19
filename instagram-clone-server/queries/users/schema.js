import pkg from 'graphql';

const { GraphQLInt, GraphQLObjectType, GraphQLString } = pkg;

export const User = new GraphQLObjectType({
   name: 'User',
   description: 'Description for a User',
   fields: () => {
      return {
         id: {
            type: GraphQLInt,
            resolve(user) {
               return user.id
            }
         },
         name: {
            type: GraphQLString,
            resolve(user) {
               return user.name
            }
         },
         userName: {
            type: GraphQLString,
            resolve(user) {
               return user.userName
            }
         },
         bio: {
            type: GraphQLString,
            resolve(user) {
               return user.bio
            }
         },
         avatar: {
            type: GraphQLString,
            resolve(user) {
               return user.avatar
            }
         },
      }
   }
});

