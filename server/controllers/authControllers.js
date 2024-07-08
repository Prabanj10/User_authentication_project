import User from '../models/userModel.js';
import createSecretToken from '../utils/SecretToken.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: 'User alredy exists' });
    }
    const user = await User.create({ email, password, username, createdAt });
    const token = createSecretToken(user._id);
    res
      .cookie('token', token, {
        httpOnly: true,
      })
      .status(201)
      .json({ message: 'User signed in successfully' });
  } catch (err) {
    console.log(err);
  }
};
