import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Your email is required'],
      unique: true,
    },
    username: {
      type: String,
      required: [true, 'Your username is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 8);
});

const User = mongoose.model('user', userSchema);

export default User;
