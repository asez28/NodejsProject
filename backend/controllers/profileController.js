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
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        });
    } catch (error) {
        console.error("Error in profile controller:", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
