import mongoose, { Schema, model } from 'mongoose';

const postSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,

        },

        age: {
            type: Number,
            required: true,
            min: 1,
            max: 150
        },

        description: {
            type: String,
            required: false,
            trim: true,

        }
    },
    
    {
        timestamps: true
    }
)

export const Post = mongoose.model('Post', postSchema);