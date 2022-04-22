import { gql } from 'apollo-server';

export const typeDefs = gql`
  scalar Date

  type User {
      id: ID!
      name: String!
      userName: String!
      avatar: String
      bio: String
      createdAt: Date
      posts: [Post],
  }

  type Post {
      id: ID!
      postContent: String!
      postDescription: String
      createdAt: Date!
      userId: Int!
      comments: [Comment]
  }

  type Comment {
    id: ID!
    commentContent: String!
    createdAt: Date!
    userId: Int!
    commentedBy: [User]
  }

  type Query {
      users: [User!]!
      user(id: ID!): User!
      getAuthedUser: User!
      postsByUser(id: ID!): [Post!]!
  }

input RegisterUserInput {
    userName: String!
    name: String = ""
    password: String!
    bio: String = ""
    avatar: String = ""
}

input UpdateUserInput{
    id: Int
    userName: String
    name: String
    bio: String
    avatar: String
}

  input CreatePostInput {
      postContent: String!
      postDescription: String = ""
      userId: Int!
  }

  type Mutation {
    createAndRegisterUser(input:RegisterUserInput!): User!
    loginUser(userName: String!, password: String!): String!
    updateUser(input: UpdateUserInput!): User!
    createPost(input: CreatePostInput!): Post!
    deleteUser(id:ID!): String!
    deletePost(id:ID!): String!
  }
`;
