import app from './app.js';
import { connectDB } from './db.js';
import dotenv from 'dotenv';

dotenv.config()
connectDB();
app.listen(3000)
console.log('Server on port', 3000)