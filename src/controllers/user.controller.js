import { User } from '../models/user.model.js';

const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('request body for account creation/register: ', req.body);

        // Basic backend validation
        if(!username || !password){
            return res.status(400).json({message: 'Credential can\'t be blank'});
        }

        // Check existing before inserting new user. Otherwise due to unique: true field in Schema will make it silently fail.
        const existing = await User.findOne({username: username.toLowerCase() });

        if(existing){
            return res.status(400).json({message: 'Username already exists!'});
        }

        // Create new User
        const user = await User.create({
            username,
            password,
            isLoggedIn: false
        });

        res.status(201).json({message: 'Account created successfully !!! ', userName: user.username });

    } catch (error) {
        res.status(500).json({message: 'Internal server Error occured while creating new user account', error: error.message});
    
    } finally {
        console.log('Accont creation service was triggered');
    }

}

const loginUser = async (req, res) => {
    try {
        // checking if user already exists 
        const { username, password } = req.body;

        const user = await User.findOne({
            username: username.toLowerCase()
        });
        console.log('Find User: ', user);
        // no users exists return with message
        if(!user) return res.status(400).josn({message: 'Username does not exists !!'})
            
        // compare Passwords
        const isMatch = await user.comparePassword(password);
        console.log('isMatch: ', isMatch);
        if(!isMatch) return res.status(400).json({
            message: 'Invalid password !!!'
        });

        res.status(200).json({
            message: 'User logged in successfully !!!',
            user: {
                id: user._id,
                username: user.username
            }
        });
        
    } catch (error) { 
        res.status(500).json({
            message: 'Internal Server error occured while Logging In', error: error.message
        });

        console.log('Error occured !!!', error);
        
    } finally {
        console.log('Log In was attempted !!!');
    }
}

export { registerUser, loginUser };