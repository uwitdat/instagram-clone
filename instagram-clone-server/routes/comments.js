import { Router } from 'express';
import { getComments, newComment } from '../controllers/comments.js';


const router = Router();

router.get('/:id', getComments)
router.post('/new-comment', newComment)

export default router;