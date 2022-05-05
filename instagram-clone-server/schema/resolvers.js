import DB from "../database/index.js";
import pkg from 'graphql-iso-date';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { GraphQLUpload } from 'graphql-upload';
import path, { dirname } from 'path';
import fs from 'fs';
import { v4 } from "uuid";

const { GraphQLDateTime } = pkg;

const checkForUser = (context) => {
  if (context.user) {
    return true
  } else {
    return false
  }
}

export const resolvers = {
  Date: GraphQLDateTime,
  Upload: GraphQLUpload,

  Query: {
    getAllUncheckedNotifs: async (_, args) => {
      const notifs = await DB.models.notification.findAll({
        where: {
          isChecked: false,
          toUserId: args.id
        },
      });
      return notifs.length;
    },
    getAllNotificationsForUser: (_, args) => {
      return DB.models.notification.findAll({
        where: {
          toUserId: args.id
        },
        order: [
          ['createdAt', 'DESC'],
        ],
      })
    },
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
        },
        order: [
          ['createdAt', 'DESC'],
        ],
      })
    },
    getAllPosts: (_, args) => {
      const { count, first } = args;

      return DB.models.post.findAll({

        offset: count, limit: first,
        order: [
          ['createdAt', 'DESC'],
        ],
      })
    },
    getCommentsForPost: (_, args) => {
      return DB.models.commentOnPost.findAll({
        where: {
          commentOnPostId: args.id
        },
        order: [
          ['createdAt', 'DESC'],
        ],
      })
    },
    getLikesForPost: (_, args) => {
      return DB.models.likeOnPost.findAll({
        where: {
          likeOnPostId: args.id
        },
      })
    },
    getAllUserFollowers: async (_, args) => {
      const userFollowers = await DB.models.follower.findAll({
        where: {
          followingUserId: args.id
        },
        include: [{
          model: DB.models.user,
          as: 'FollowedByUser'
        }],
        order: [
          ['FollowedByUser', 'createdAt', 'DESC']
        ]
      })
      return userFollowers.map((follower) => follower.FollowedByUser)
    },
    getAllUserFollowing: async (_, args) => {
      const userFollowing = await DB.models.follower.findAll({
        where: {
          followedByUserId: args.id,
        },
        include: [{
          model: DB.models.user,
          as: 'FollowingUser',
        }],
        order: [
          ['FollowingUser', 'createdAt', 'DESC'],
        ],
      })
      return userFollowing.map((following) => following.FollowingUser)
    }
  },

  User: {
    posts: (parent, _) => {
      return DB.models.post.findAll({
        where: {
          userId: parent.id
        },
        order: [
          ['createdAt', 'DESC'],
        ],
      })
    },
    followers: async (parent, _) => {
      const userFollowers = await DB.models.follower.findAll({
        where: {
          followingUserId: parent.id
        },
        include: [{
          model: DB.models.user,
          as: 'FollowedByUser'
        }],
        order: [
          ['FollowedByUser', 'createdAt', 'DESC']
        ]
      })
      return userFollowers.map((follower) => follower.FollowedByUser)
    },
    following: async (parent, _) => {
      const userFollowing = await DB.models.follower.findAll({
        where: {
          followedByUserId: parent.id,
        },
        include: [{
          model: DB.models.user,
          as: 'FollowingUser',
        }],
        order: [
          ['FollowingUser', 'createdAt', 'DESC'],
        ],
      })
      return userFollowing.map((following) => following.FollowingUser)
    }
  },
  Comment: {
    commentedBy: async (parent, _) => {
      return DB.models.user.findByPk(parent.dataValues.commentedByUserId)
    },
    replies: async (parent, _) => {
      return DB.models.replyToComment.findAll({
        where: {
          replyToCommentId: parent.id
        },
        order: [
          ['createdAt', 'DESC'],
        ],
      })
    }
  },
  ReplyToComment: {
    repliedBy: (parent, _) => {
      return DB.models.user.findByPk(parent.dataValues.replyFromUserId)
    }
  },
  Notification: {
    onPost: (parent, _) => {
      return DB.models.post.findByPk(parent.dataValues.onPostId)
    },
    fromUser: (parent, _) => {
      return DB.models.user.findByPk(parent.dataValues.fromUserId)
    }
  },
  Like: {
    likedBy: async (parent, _) => {
      return DB.models.user.findByPk(parent.dataValues.likedByUserId)
    }
  },
  Post: {
    postedBy: (parent, _) => {
      return DB.models.user.findByPk(parent.dataValues.userId)
    },
    comments: (parent, _) => {
      return DB.models.commentOnPost.findAll({
        where: {
          commentOnPostId: parent.id
        },
        order: [
          ['createdAt', 'DESC'],
        ],
      })
    },
    likes: (parent, _) => {
      return DB.models.likeOnPost.findAll({
        where: {
          likeOnPostId: parent.id
        },
        order: [
          ['createdAt', 'DESC'],
        ],
      })
    }
  },
  Mutation: {
    flipIsCheckedValues: async (_, args) => {
      const { ids } = args.input;

      ids.forEach((id) => {
        DB.models.notification.update(
          { isChecked: true },
          { where: { id } })
      });

      return 'notifications successfully updated'
    },

    uploadFile: async (_, { file }) => {
      const { createReadStream, filename } = await file;
      const stream = createReadStream();


      const name = v4() + filename

      const pathName = path.join(`../public/images/${name}`)
      await stream.pipe(fs.createWriteStream(pathName))

      return {
        url: `http://localhost:5000/images/${name}`
      };
    },
    updateUser: async (_, args) => {
      const { id } = args.input;
      const user = await DB.models.user.update(
        args.input,
        { where: { id }, returning: true, plain: true }
      );
      return user[1].dataValues;
    },
    followUser: async (_, args) => {
      const { followedByUserId, followingUserId } = args;

      const newFollower = await DB.models.follower.create({
        followedByUserId,
        followingUserId
      });

      await DB.models.notification.create({
        notificationType: 'started following you',
        fromUserId: followedByUserId,
        toUserId: followingUserId
      })

      return newFollower;
    },
    unfollowUser: async (_, args) => {
      const { userId, userIdToUnfollow } = args;

      await DB.models.follower.destroy({
        where: {
          followedByUserId: userId,
          followingUserId: userIdToUnfollow
        }
      })
      return `user with id ${userId} successfully unfollowed user with id ${userIdToUnfollow}.`
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
    removeLike: async (_, args) => {
      const { likeOnPostId, likedByUserId } = args;
      await DB.models.likeOnPost.destroy({
        where: { likeOnPostId, likedByUserId }
      })
      return `Like with id of ${likeOnPostId} by user ${likedByUserId} successfully removed.`
    },
    createPost: (_, args) => {
      const newPost = args.input;
      return DB.models.post.create({
        postContent: newPost.postContent,
        postDescription: newPost.postDescription,
        userId: newPost.userId
      })
    },
    createCommentForPost: async (_, args) => {
      const newComment = args.input;

      const comment = await DB.models.commentOnPost.create({
        commentContent: newComment.commentContent,
        commentOnPostId: newComment.commentOnPostId,
        commentedByUserId: newComment.commentedByUserId
      })

      await DB.models.notification.create({
        commentContent: newComment.commentContent,
        onPostId: newComment.commentOnPostId,
        fromUserId: newComment.commentedByUserId,
        toUserId: newComment.commentToUserId,
        notificationType: 'commented:'
      })


      return comment;
    },
    createLikeForPost: async (_, args) => {
      const { likeOnPostId, likedByUserId, likeForUserId } = args;

      const newLike = await DB.models.likeOnPost.create({
        likeOnPostId,
        likedByUserId
      })

      await DB.models.notification.create({
        onPostId: likeOnPostId,
        fromUserId: likedByUserId,
        notificationType: 'liked your post',
        toUserId: likeForUserId
      })

      return newLike;
    },
    replyToComment: (_, args) => {
      const newReply = args.input

      return DB.models.replyToComment.create({
        replyContent: newReply.replyContent,
        replyToCommentId: newReply.replyToCommentId,
        replyFromUserId: newReply.replyFromUserId
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
};

