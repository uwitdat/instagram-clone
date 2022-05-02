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
  try {
    const newComment = await DB.models.commentOnPost.create({
      commentContent: userInput.commentContent,
      commentOnPostId: userInput.commentOnPostId,
      commentedByUserId: userInput.commentedByUserId
    })

    return {
      status: 'OK',
      data: newComment
    }
  } catch (err) {
    return {
      status: 'FAILED',
      errorMessage: err.message
    }
  }

}