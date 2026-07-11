import dotenv from 'dotenv';
import connectDB from './config/database.js';
import app from './app.js';

dotenv.config({
    path: './.env'

});

const startServer = async () => {
    try {
        await connectDB();

        app.on('error', (error) => {
            console.log('ERROR: ', error)
            throw error;
        });

        const PORT = (process.env.PORT || 8080);

        app.listen(PORT, () => {
            console.log(`Server is running on Port: ${PORT}`)
        });

    } catch (error) {
        console.log(`Server couldn't start !!!  ${error}`)
    }
}

startServer();