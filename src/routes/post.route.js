import { Router } from 'express';
import { createPost } from '../controllers/post.controller.js';
import { getAllPosts } from '../controllers/post.controller.js';
import { deletePost } from '../controllers/post.controller.js';

const router = Router();

router.route('/create').post(createPost);
router.route('/getAllPosts').get(getAllPosts);
router.route('/deletePost/:id').delete(deletePost);

export default router;