import User from '../models/userModel.js';
import createSecretToken from '../utils/SecretToken.js';
import bcrypt from 'bcrypt';

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
         withCredentials: true,
        httpOnly: false,
      })
      .status(201)
      .json({ message: 'User signed in successfully', success: true, user });
  } catch (err) {
    console.error(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: 'all fields are required' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: 'incorrect email or password' });
    }
    const auth = bcrypt.compareSync(password, user.password);
    if (!auth) {
      return res.json({ message: 'incorrect password or email' });
    }
    const token = createSecretToken(user._id);
    res.cookie('token', token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: 'User logged in successfully', success: true });
  } catch (error) {
    console.error(error);
  }
};
