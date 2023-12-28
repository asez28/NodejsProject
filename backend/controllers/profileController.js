import User from '../models/user.js';

export const profile = async (req, res) => {
    try {
        const userFound = await User.findById(req.user.id);

        if (!userFound) {
            console.error("User not found");
            return res.status(400).json({ message: "User not found" });
        }

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            "rol": userFound.rol,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        });
    } catch (error) {
        console.error("Error in profile controller:", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const upgradeUserRole = async (req, res) => {
    try {
        const userId = req.params.id;

        // Verifica si el usuario existe antes de intentar actualizarlo
        const existingUser = await User.findById(userId);

        if (!existingUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Actualiza el rol del usuario
        const updatedUser = await User.findByIdAndUpdate(userId, { rol: 'Pro' }, { new: true });

        res.json(updatedUser);
    } catch (error) {
        console.error('Error al actualizar el rol:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

  