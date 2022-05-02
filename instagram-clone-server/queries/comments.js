import DB from '../database/index.js';

const comments = DB.models.commentOnPost;

export const getAllComments = async (postId) => {
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
          include: [{ model: DB.models.user, as: 'user', attributes: { exclude: ['password', 'createdAt', 'updatedAt'] } }]
        },
      ]
    });

    if (!getComments) {
      return res.status(400).send({
        message: 'no comments found'
      });
    }

    return getComments;

  } catch (err) {
    console.log(err);
  }
}