import express from 'express';
import userRouter from './modules/user/user.router';

const app = express();
app.use(express.json());
app.use('/api/user/', userRouter);

const server = app.listen(3000, () =>{
  console.log("Current environment:", process.env.NODE_ENV);
  console.log("Server started on 3000 port")
})
  

export default app;