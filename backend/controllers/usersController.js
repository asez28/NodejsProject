import User from '../models/user.js';  

export const getAllUsers = async () => {
    try {
        const users = await User.find({}, '-password');  
        return users;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw error; 
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        return res.json(users);  // Solo una llamada de respuesta

    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error al obtener usuarios.' });  
    }
};

