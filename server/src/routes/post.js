import { Router } from 'express';
import { showPosts, findPost, addPost, updatePost, removePost } from '../controllers/post';

const router = Router();

router.get('/', showPosts);
router.get('/:id', findPost);
router.post('/', addPost);
router.put('/:id', updatePost);
router.delete('/:id', removePost);

export default router;
