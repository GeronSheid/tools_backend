import express from 'express';
import userRouter from './modules/user/user.router';
import cookieParser from 'cookie-parser';
import toolsRouter from './modules/tools/tools.router';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api/user/', userRouter);
app.use('/api/tools/', toolsRouter);

const server = app.listen(3000, () =>{
  console.log("Current environment:", process.env.NODE_ENV);
  console.log("Server started on 3000 port")
})
  

export default app;