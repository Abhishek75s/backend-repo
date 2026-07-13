import express from 'express'
import userRouter from './routes/user.route.js'

const app = express() // create an express app

app.use(express.json());

// routes declarations
app.use('/api/v1/users', userRouter);
// app.use('/api/v1/posts', postRouter);

// example route: http://localhost:3000/api/v1/users/register

export default app;