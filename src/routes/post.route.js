import { Router } from 'express';
import { createPost } from '../controllers/post.controller.js';
import { getAllPosts } from '../controllers/post.controller.js';

const router = Router();

router.route('/create').post(createPost);
router.route('/getAllPosts').get(getAllPosts)

export default router;