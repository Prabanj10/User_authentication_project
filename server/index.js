import express from 'express';
import authRoute from "./routes/authRoute.js"
import 'dotenv/config';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

const { MONGODB_URL, PORT } = process.env;
const port = PORT || 3000;

mongoose
  .connect(MONGODB_URL)
  .then(() => console.log('connected to database'))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cookieParser());

app.use('/',authRoute );
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
