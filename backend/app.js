import express from "express";
import morgan from "morgan";
import authRoutes from './routes/auth.js';
import cookieParser from "cookie-parser";
import taskRoutes from './routes/task.js';
import cors from 'cors';

const app = express();

app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true
    })
  );
app.use(morgan('dev'));
app.use(express.json())
app.use(cookieParser())

app.use("/api", authRoutes);
app.use("/api", taskRoutes)

export default app;