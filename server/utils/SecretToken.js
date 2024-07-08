import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const createSecretToken = (id) => {
  jwt.sign({ id }, process.env.TOKEN_KEY, { expiresIn: 3 * 60 * 60 });
};

export default createSecretToken