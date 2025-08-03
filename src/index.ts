import express from 'express';
import {prisma} from './prisma/prisma.service';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({message: 'Здарова мир'})
})

app.post('/', async (req, res) => {
  const {email, name} = req.body;
  const result = await prisma.user.create({
    data: {
      name: name,
      email: email
    }
  })
  res.json(result)
})

const server = app.listen(3000, () =>{
  console.log("Current environment:", process.env.NODE_ENV);
  console.log("Server started on 3000 port")
})
  



export default app;