import { Router } from 'express';
import { getComments, newComment, newReplyToComment } from '../controllers/comments.js';


const router = Router();

router.get('/:id', getComments)
router.post('/new-comment', newComment)
router.post('/new-reply', newReplyToComment)

export default router;