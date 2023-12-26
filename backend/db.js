import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Conected to MongoDB");
    } catch (error) {
        console.error('Error de conexión a MongoDB:', error);
    }
};
