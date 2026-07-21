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

// Delete any post with its _id
const deletePost = async (req, res) => {
    try {
        // const id = req.params.id;  // method: 1, direct access to keys 
        
        const { id } = req.params;  // method: 2, destructuring is preferred one. Looks for 'id' as key
        // VERY helpful when more than one key needs to be extracted 
        
        // Creating Server log 
        console.log('\nPost delete request initiated with id: ', id);
        
        // Basic backend validation 
        /*
        if (!id) // Note for: [message: 'id could not be empty !!!'] 
        // if the id would be empty then URL path will show: " Cannot DELETE /api/v1/posts/deletePost/ "
        // hence need not to validate this scenario
        */

        const postId = await Post.findOne({ _id: id });  // id is passed as object, required
        
        // Recommended to alternatively use " await Post.findByIdAndDelete(id); to avoid if-else logic"
        if(!postId)
        {
            console.log('post ID NOT found');

            return res.status(400).json({
                message: 'Post with given _id does not Exists !!!'
            });
        }
        else {
            // res.status(200).json(postId)
            // ek request ke liye ek hi response bhej skte h kewal, isliye 'return' lagao always before sending the response
            // otherwise, Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client, error ayega
            console.log('post ID found: ', postId);
        };
        
        const deletedPost = await Post.findByIdAndDelete(id); // passing id as string, is optional
        // mongoose to find in DB/query object is required
        // it looks for key as _id which is of object type
        // MongoDB internally casts it to ObjectId
        console.log('Deleted post details: ', deletedPost);

        if(!deletedPost) return res.status(404).json({
            message: 'Post with given _id does not Exists !!!',
            error: error.message
        });

        return res.status(200).json({
            message: 'Post deleted Successfully',
            data: deletedPost
        });        
        
    } catch (error) {
        res.status(500).json({
            message: 'Error occured while deleting the Post',
            error: error.message
        });

    } finally {
        console.log('Post deletion request was made !!!');
    }
}

// update data in exsting posts
const updatePost = async (req, res) => {
    try {
        // basic backend validation
        console.log('update request post initiated...');
        const newData = req.body; 

        // const newData = Object.keys(req.body); // this converts {name: 'x', age: 10, description: ''} 
        // to array of [name, age, description]
        
        if(newData){  // {} = truthy value, if(newData.length === 0) -> will be a faulty check. {}.length always returns undefined
            // which is surely not === 0, hence the if block will not be executed
            console.log('NewData: ', newData);
        }
        
        if(!newData || Object.keys(req.body).length === 0) {  // count the number of keys present in req.body's raw json payload data
            return res.status(400).json({
                message: 'Data field can not be empty !!!'
            });
        }

        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true}); 
        console.log('Fetched post data: ', post);
        if(!post) {
            return res.status(404).json({
                message: 'No post found with given ID'
            }); 
        }

        res.status(200).json({
            message: 'Post updated sucessfully.',
            post: post
        });

    } catch (error) {
        return res.status(400).json({
            message: error.message,
            error: error
        });

    } finally {
        console.log('update Post request was made !!!');
    }
}

export { createPost, getAllPosts, deletePost, updatePost };