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
  }

  type Query {
      users: [User!]!
      user(id: ID!): User!
  }

  input CreateUserInput {
      name: String!
      userName: String!
      avatar: String = ""
      bio: String = ""
  }

  input CreatePostInput {
      postContent: String!
      postDescription: String = ""
      userId: Int!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    createPost(input: CreatePostInput!): Post!
  }
`;
