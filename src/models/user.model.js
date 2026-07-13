import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

// 1. Schema defined with lowerCamelCase
const userSchema = new Schema({
  username: { 
    type: String, 
    required: true,
    unique: true, // Recommended: prevents duplicate usernames
    trim: true    // Recommended: removes accidental spaces
  },
  password: { 
    type: String, 
    required: true 
  }
}, { 
  timestamps: true // Recommended: automatically tracks createdAt and updatedAt
});

// 2. Model class defined with Upper PascalCase and exported
export const User = model('User', userSchema);

// export User;
