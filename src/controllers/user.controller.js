import { User } from '../models/user.model.js';

const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('request body: ', req.body);

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
        res.status(500).json({message: 'Internal server Error occured while creating new user account', error});
    
    } finally {
        console.log('Accont creation service triggered');
    }

}

export { registerUser };