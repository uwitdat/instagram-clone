import { getAllComments } from '../queries/comments.js';

export const getComments = async (req, res) => {
  const postId = req.params.id;

  const comments = await getAllComments(postId)

  return res.send(comments);
}
