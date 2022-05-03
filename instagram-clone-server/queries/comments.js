import DB from '../database/index.js';

const comments = DB.models.commentOnPost;

export const getCommentsByPostId = async (postId) => {
  try {
    const getComments = await comments.findAll({
      attributes: { exclude: ['commentedByUserId', 'commentOnPostId', 'updatedAt'] },
      where: {
        commentOnPostId: postId,
      },
      order: [
        ['createdAt', 'DESC'],
      ],

      include: [
        { model: DB.models.user, as: 'user', attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }, },
        { model: DB.models.post, as: 'post', attributes: { exclude: ['updatedAt'] }, },
        {
          model: DB.models.replyToComment, as: 'replyToComments',
          attributes: { exclude: ['replyFromUserId', 'replyToCommentId', 'createdAt', 'updatedAt'] },
          include: [
            { model: DB.models.user, as: 'user', attributes: { exclude: ['password', 'createdAt', 'updatedAt'] } }
          ]
        },
      ]
    });

    return getComments;

  } catch (err) {
    console.log(err);
  }
}

export const createNewComment = async (userInput) => {
  const { commentContent, commentOnPostId, commentedByUserId } = userInput;

  try {
    const newComment = await DB.models.commentOnPost.create({
      commentContent,
      commentOnPostId,
      commentedByUserId
    });

    return {
      data: newComment
    }
  } catch (err) {

    return {
      errorMessage: err.message
    }
  }
}

export const createNewReplyToComment = async (userInput) => {
  const { replyContent, replyToCommentId, replyFromUserId } = userInput;

  try {
    const newReply = await DB.models.replyToComment.create({
      replyContent,
      replyToCommentId,
      replyFromUserId,
    });

    return {
      data: newReply
    }

  } catch (err) {

    return {
      errorMessage: err.message
    }
  }
}