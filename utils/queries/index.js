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
      id, 
      name,
      userName,
      bio,
      avatar,
      followers {
        id
        userName
        name
        bio 
        avatar
      }
      following {
          id
          userName
          name
          bio 
          avatar
        }
      posts {
        id
        postContent
        postDescription
        createdAt
        userId
        comments{
          commentContent
        }
      }
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
}`

export const GET_USER_BY_ID = gql`
  query User($userId: ID!){
    user(id: $userId){
      id, 
      name,
      userName,
      bio,
      avatar,
      posts {
        id
        postContent
        postDescription
        createdAt
        userId
        comments{
          commentContent
        }
        likes {
          likeOnPostId
        }
      }
    }
  }`


export const GET_COMMENTS_FOR_POST = gql`
  query GetCommentsForPost($postId: ID!){
    getCommentsForPost(id: $postId) {
    id,
    commentContent,
    createdAt
    commentedBy {
      id
      name
      userName
      avatar
      bio
      posts  {
        id
        postContent
        postDescription
        createdAt
        userId
      }
    }
    replies {
      id
      replyContent
      replyToCommentId
      createdAt
      repliedBy {
        id
        avatar
        userName
        name
        bio
      }
    }
  }
}
`

export const GET_ALL_LIKES_FOR_POST = gql`
  query GetLikesForPost($postId: ID!){
    getLikesForPost(id: $postId) {
      id,
      likedByUserId,
      likedBy {
        id
        avatar
        bio
        userName
        name
        followers {
          id
          userName
          name
          bio 
          avatar
        }
        following {
            id
            userName
            name
            bio 
            avatar
          }
        posts  {
            id
            postContent
            postDescription
            createdAt
            userId
          }       
        }
      }
    }
`

export const GET_ALL_POSTS = gql`
  query GetAllPosts($count: Int, $first: Int!){
    getAllPosts(count: $count, first: $first) {
      id
      postContent
      postDescription
      createdAt
      postedBy {
        id
          userName
          name
          avatar
          bio
          posts  {
            id
            postContent
            postDescription
            createdAt
            userId
          }
      }
      comments {
        id
        commentContent
        createdAt
        commentedBy {
          id
          userName
          name
          avatar
          bio
        }
          replies {
          id
          replyContent
          replyToCommentId
          createdAt
          repliedBy {
            id
            avatar
            userName
            name
            bio
          }
        }
      }
      likes {
        id
        likedBy {
          id
          userName
          name
          avatar
          bio
        }
      }
    }
  }
`

export const GET_ALL_USER_FOLLOWERS = gql`
  query GetUserFollowers($userId: ID!){
    getAllUserFollowers(id: $userId) {
      id
      name 
      userName
      avatar
      bio
      posts  {
        id
        postContent
        postDescription
        createdAt
        userId
        comments {
          id
          commentContent
          createdAt
          commentedBy {
            id
            userName
            name
            avatar
            bio
          }
        }
        likes {
          id
          likedBy {
            id
            userName
            name
            avatar
            bio
          }
        }
      }
    }
  }
`

export const GET_ALL_USER_FOLLOWING = gql`
  query GetUserFollowing($userId: ID!){
    getAllUserFollowing(id: $userId) {
      id
      name 
      userName
      avatar
      bio
      posts  {
        id
        postContent
        postDescription
        createdAt
        userId
        comments {
          id
          commentContent
          createdAt
          commentedBy {
            id
            userName
            name
            avatar
            bio
          }
        }
        likes {
          id
          likedBy {
            id
            userName
            name
            avatar
            bio
          }
        }
      }
    }
  }
`

export const GET_NOTIFS_INT = gql`
  query GetAllUncheckedNotifs($userId: ID!) {
    getAllUncheckedNotifs(id: $userId)
  }
`

export const GET_NOTIFICATIONS_FOR_USER = gql`
  query GetAllNotificationsForUser($userId: ID!){
    getAllNotificationsForUser(id: $userId) {
      id
      notificationType
      createdAt
      isChecked
      commentContent
      onPost {
        id
        postContent
      }
      fromUser {
        id
        name
        userName
        bio
        avatar
          posts  {
          id
          postContent
          postDescription
          createdAt
          userId
          comments {
            id
            commentContent
            createdAt
            commentedBy {
              id
              userName
              name
              avatar
              bio
            }
          }
          likes {
            id
            likedBy {
              id
              userName
              name
              avatar
              bio
            }
          }
        }
      }
    }
  }
`