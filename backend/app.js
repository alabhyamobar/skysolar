import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './src/routes/message.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", router)


export default app;