import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        // console.log(`\n MongoDB connected!!! ${connectionInstance.conection.host}`)
        console.log('MongoDB connected Successfully !!! ');

    } catch (error) {
        console.log('MongoDB connection  xxxxx \n', error);
        process.exit(1)

    }
}

export default connectDB;