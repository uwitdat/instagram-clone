import { getCommentsByPostId, createNewComment } from '../queries/comments.js';

export const getComments = async (req, res) => {
  const postId = req.params.id;
  const comments = await getCommentsByPostId(postId);
  return res.send(comments);
}


export const newComment = async (req, res) => {
  const newComment = await createNewComment(req.body)

  if (newComment.status === 'OK') {
    return res.status(201).send({ data: newComment.data })
  } else {
    return res.status(500).send({ errorMessage: newComment.errorMessage })
  }
}