import 'express-async-errors'

import * as dotenv from 'dotenv';
dotenv.config();


import express from "express"
import mongoose from 'mongoose';
import morgan from "morgan"
import cloudinary from 'cloudinary';
import cookieParser from 'cookie-parser';
import { app, server } from './socket/socket.js';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';

//routes
import authRouter from './routes/authRoutes.js'
import messageRouter from './routes/messageRoutes.js'
import userRouter from './routes/userRoutes.js'
import { authenticateUser } from './middleware/authMiddleware.js';
import { validateIdParam } from './middleware/validationMiddleware.js';
 cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
app.use(cookieParser())
app.use(express.json())

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }




//const __dirname = dirname(fileURLToPath(import.meta.url));


//app.use(express.static(path.resolve(__dirname, './client/dist')));


// app.get('*', (req, res) => {
 // res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
//}); 

//routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/messages',authenticateUser, messageRouter);
app.use('/api/v1/users',authenticateUser,userRouter)

const __dirname = dirname(fileURLToPath(import.meta.url));


app.use(express.static(path.resolve(__dirname, './client/dist')));


 app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
}); 


app.use('*', (req, res) => {
    res.status(404).json({ msg: 'not found' });
  });
app.use(errorHandlerMiddleware)
 
const port = process.env.PORT || 5000;


try {
    await mongoose.connect(process.env.MONGO_URL)
    server.listen(port,()=>{
        console.log(`server is running on port ${port}`);
    })
} catch (error) {
    console.log(error);
  process.exit(1);
}