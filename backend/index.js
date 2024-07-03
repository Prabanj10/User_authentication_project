import express from 'express';
import authrouter from './routes/oauthRoute.js';

const app = express();
const port = process.env.PORT || 3000 

app.use(express.urlencoded({extended:true}))

app.use('/',authrouter)

app.listen(port, (req, res) => {
  console.log('server running on port 3000');
});
