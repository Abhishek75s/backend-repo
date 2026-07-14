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

// Before saving any password we need to hash it.
userSchema.pre("save", async function () {
  if(!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);

});  // Note: next() function is not required for async/await in modern mongoooser versions

// compare password before logging in
userSchema.methods.comparePassword = async function (password){
  return await bcrypt.compare(password, this.password);
  // return await (password === this.password); // without bcrypt
}

// 2. Model class defined with Upper PascalCase and exported
export const User = model('User', userSchema);

// export User;
