import express from 'express';
import authrouter from './routes/oauthRoute.js';
import 'dotenv/config';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

const { MONGODB_URL, PORT } = process.env;
const port = PORT || 3000;

mongoose
  .connect(MONGODB_URL)
  .then(() => console.log('connected to database'))
  .catch((err) => console.log(err));

app.use(express.json());

app.use('/', authrouter);
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.listen(port, (req, res) => {
  console.log(`server running on ${port}`);
});
