import { Post } from '../models/post.model.js';

// Create new Post
const createPost = async (req, res) => {
    try {
        const { name, age, description } = req.body;
        console.log('\nPost creation request initiated: ')

        // Basic backend validation
        if(!name || !age) res.status(400).json({
            message: 'Name or Age can\'t be empty'
        });
        
        // Create Post request
        const post = await Post.create({ name, age, description });

        res.status(201).json({
            message: 'New post created successfully'
        });
        
    } catch (error) {
        res.status(500).json({
            message: 'Post creation failed !!!',
            error: error
        });

    } finally {
        console.log('Post creation request was made !!!');
    }
}   

export { createPost };