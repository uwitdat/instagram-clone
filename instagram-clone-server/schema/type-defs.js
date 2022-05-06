import { gql } from 'apollo-server';

export const typeDefs = gql`
  scalar Date
  scalar Upload

  type User {
      id: ID!
      name: String
      userName: String!
      avatar: String
      bio: String
      createdAt: Date
      posts: [Post],
      followers: [User]
      following: [User]
  }

  type Post {
      id: ID!
      postContent: String!
      postDescription: String
      createdAt: Date!
      userId: Int!
      postedBy: User
      comments: [Comment]
      likes: [Like]
  }

  type Comment {
    id: ID!
    commentContent: String!
    createdAt: Date!
    commentedByUserId: Int!
    commentOnPostId: Int!
    commentedBy: User!
    replies: [ReplyToComment]
  }

  type Like {
    id: ID!
    likeOnPostId: Int!
    likedByUserId: Int!
    likedBy: User!
  }

  type Follower {
    id: ID!
    followedByUserId: Int!
    followingUserId: Int!
  }

  type ReplyToComment {
    id: ID!
    replyContent: String!
    replyToCommentId: Int!
    replyFromUserId: Int!
    repliedBy: User!
    createdAt: Date
  }

  type File {
    url: String!
  }

  type Notification {
    id: ID!
    notificationType: String!
    commentContent: String
    fromUserId: Int!
    toUserId: Int!
    onPostId: Int!
    isChecked: Boolean!
    createdAt: Date
    fromUser: User!
    onPost: Post
  }

  type Query {
      users: [User!]!
      user(id: ID!): User!
      getAuthedUser: User!
      postsByUser(id: ID!): [Post!]!
      getCommentsForPost(id: ID!): [Comment!]!
      getLikesForPost(id: ID!): [Like!]!
      getAllPosts(count: Int, first: Int!): [Post!]!
      getAllPostsNoOffset: [Post!]!
      getAllUserFollowers(id: ID!): [User!]!
      getAllUserFollowing(id: ID!): [User!]!
      getAllNotificationsForUser(id: ID!): [Notification!]!
      getAllUncheckedNotifs(id: ID!): Int!
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

  input CreateCommentInput {
    commentContent: String!
    commentedByUserId: Int!
    commentOnPostId: Int!
    commentToUserId: Int!
  }

  input ReplyToCommentInput {
    replyContent: String!
    replyToCommentId: Int!
    replyFromUserId: Int!
  }

  input NotificationIds {
    ids: [Int!]
  }

  type Mutation {
    createAndRegisterUser(input:RegisterUserInput!): User!
    loginUser(userName: String!, password: String!): String!
    updateUser(input: UpdateUserInput!): User!
    createPost(input: CreatePostInput!): Post!
    deleteUser(id:ID!): String!
    deletePost(id:ID!): String!
    createCommentForPost(input: CreateCommentInput): Comment!
    createLikeForPost(likeOnPostId: Int!, likedByUserId: Int!, likeForUserId: Int!): Like!
    removeLike(likeOnPostId: Int!, likedByUserId: Int!): String!
    followUser(followedByUserId: Int!, followingUserId: Int!): Follower!
    unfollowUser(userId:ID!, userIdToUnfollow: ID!): String!
    replyToComment(input: ReplyToCommentInput!): ReplyToComment!
    uploadFile(file: Upload!): File!
    flipIsCheckedValues(input: NotificationIds): String!
    searchUsers(searchVal: String!): [User!]!
    createUsers: String!
    createPosts: String!
  }
`;

