import { gql } from '@apollo/client';

export const LOGIN_USER_MUTATION = gql`
    mutation LoginUser($userName: String!, $password: String!) {
        loginUser(userName: $userName, password: $password)
    }`

export const CREATE_USER_MUTATION = gql`
    mutation CreateAndRegisterUser($createUserInput: RegisterUserInput!) {
        createAndRegisterUser(input: $createUserInput) {
            id 
            name 
            userName
            avatar
            bio
            }
        }`

export const CREATE_POST_MUTATION = gql`
    mutation CreatePost($createPostInput: CreatePostInput!){
        createPost(input: $createPostInput){
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
`

export const EDIT_USER_MUTATION = gql`
    mutation UpdateUser($updateUserInput: UpdateUserInput!){
        updateUser(input: $updateUserInput){
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
    }
`

export const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!){
        deletePost(id: $postId)
    }
`

export const CREATE_COMMENT_FOR_POST = gql`
    mutation CreateCommentForPost($createCommentInput: CreateCommentInput!){
        createCommentForPost(input: $createCommentInput){
            id
            commentContent
            commentedByUserId
            commentOnPostId
            createdAt
        }
    }
`


export const CREATE_LIKE_FOR_POST = gql`
    mutation CreateLikeForPost($likeOnPostId: Int!, $likedByUserId: Int!){      
        createLikeForPost(likeOnPostId: $likeOnPostId, likedByUserId: $likedByUserId) {
            id,
            likedByUserId,
            likeOnPostId
        }
    }
`

export const REMOVE_LIKE_FROM_POST = gql`
    mutation RemoveLike($likeOnPostId: Int!, $likedByUserId: Int!){
        removeLike(likeOnPostId: $likeOnPostId, likedByUserId: $likedByUserId)
    }
    `

export const FOLLOW_USER = gql`
    mutation FollowerUser($followedByUserId: Int!, $followingUserId: Int!){
        followUser(followedByUserId: $followedByUserId, followingUserId: $followingUserId) {
            id
            followedByUserId
            followingUserId
        }
    }
`

export const UNFOLLOW_USER = gql`
    mutation UnfollowUser($userId: ID!, $userIdToUnfollow: ID!){
        unfollowUser(userId: $userId, userIdToUnfollow: $userIdToUnfollow)
        }
`

export const CREATE_REPLY_TO_COMMENT = gql`
    mutation ReplyToComment($replyToCommentInput: ReplyToCommentInput!){
        replyToComment(input: $replyToCommentInput){
            id
            replyContent
            replyToCommentId
            replyFromUserId
        }
    }
`

export const UPLOAD_FILE = gql`
    mutation UploadFile($file: Upload!){
        uploadFile(file: $file){
            url
        }
    }
`