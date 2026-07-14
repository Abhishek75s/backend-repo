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

// fetch all posts of a given 'name'
const getAllPosts = async (req, res) => {
    try {
        const { name } = req.body;
        console.log('\nGet all posts requested for: ', name);

        // Basic backend validation of request credentials
        if(!name) return res.status(400).json({
            message: 'name could not be empty in getAllPosts request'
        });

        // fetch all posts from DB
        const allPosts = await Post.find({ name });
        console.log('Number of posts found', allPosts.length );
        
        // if(!allPosts) // This is wrong and will not work because, even empty array [] is 'truthy' value
        if(allPosts.length === 0)
        {
            res.status(400).json({
                message: 'No post/s is found'
            });
        }      

        res.status(200).json({ allPosts: allPosts});
        
    } catch (error) {
        res.status(500).json({
            message: 'ERROR: Could not fetch all posts',
            error: error.message
        });
        
    } finally {
        console.log('Get all posts request was made !!!');
    }
}

export { createPost, getAllPosts};