import { getCommentsByPostId, createNewComment, createNewReplyToComment } from '../queries/comments.js';

// get all comments by post id
export const getComments = async (req, res) => {
  const postId = req.params.id;
  const comments = await getCommentsByPostId(postId);
  return res.send(comments);
}


// create new comment
export const newComment = async (req, res) => {
  const { data, errorMessage } = await createNewComment(req.body);

  if (data) {
    return res.status(201).send({ data: data, success: true });
  } else {
    return res.status(500).send({ errorMessage: errorMessage, success: false });
  }
}

// create new reply for comment
export const newReplyToComment = async (req, res) => {
  const { data, errorMessage } = await createNewReplyToComment(req.body);

  if (data) {
    return res.status(201).send({ data: data, success: true });
  } else {
    return res.status(500).send({ errorMessage: errorMessage, success: false });
  }
}