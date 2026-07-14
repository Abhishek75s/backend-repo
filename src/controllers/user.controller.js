import { User } from '../models/user.model.js';

const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('\nAccount creation reuqested for username: ', username);

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
        console.log('Accont creation service was triggered !!!');
    }

}

const loginUser = async (req, res) => {
    try {
        // checking if user already exists 
        const { username, password } = req.body;
        console.log('\nLog In requested for username: ', username);

        const user = await User.findOne({
            username: username.toLowerCase()
        });
        console.log('Found User in DB? : ', user);
        // no users exists return with message
        if(!user) return res.status(400).josn({
            message: 'Username does not exists !!'
        });
            
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
            message: 'Internal Server error occured while Logging In',
            error: error
        });

        console.log('Error occured !!!', error);
        
    } finally {
        console.log('Log In was attempted !!!');
    }
}

const logoutUser = async (req, res) => {
    try {
        const { username } = req.body;
        console.log('\nLog out requested for username: ', username);
        const user = await User.findOne({
            username
        });
        
        console.log('username found in DB? : ', user);
        
        if(!user) return res.status(404).json({
            message: 'Usernmae does not exists for logout request'
        });

        res.status(200).json({
            message: 'User logged out successfully'
        });
        
        
    } catch (error) {
        
        res.status(500).json({
            message: 'Internal server error occured, while logging out !!!',
            error: error
        });
    } finally {
        console.log('Log out request was made !!!');

    }
    
}

export { registerUser, loginUser, logoutUser };