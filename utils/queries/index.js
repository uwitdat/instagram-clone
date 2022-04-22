import { gql } from '@apollo/client';

export const QUERY_ALL_USERS = gql`
query getAllUsers{
  users{
    id, 
    name,
    userName,
    bio,
    avatar,
    posts{
      id
      postContent,
      postDescription,
      createdAt,
      userId
      comments {
        id
        commentContent        
      }
    }
  }
}
`

export const GET_AUTHED_USER = gql`
query GetAuthedUser{
  getAuthedUser {
    id
    name
    userName
    bio
    avatar
  }
}
`
export const GET_POSTS_FROM_USER = gql`
query PostsByUser($userId: ID!){
  postsByUser(id: $userId){
      id
      postContent
      postDescription
      createdAt
      userId
  }
}
`