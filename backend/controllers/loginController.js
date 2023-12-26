import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';

export const login = async (req, res) => {
    const {email, password} = req.body;
    
   try {
    
    const userFound = await User.findOne({email})
    
   if (!userFound) return res.status(400).json({message: "User not found"});

    const isMatch = await bcrypt.compare(password, userFound.password);

    if(!isMatch) return res.status(400).json({message: "Incorrect password"})

  
       const token = await createAccessToken({
        id: userFound._id,
        rol: userFound.rol   
     })
       res.cookie('token', token);
       res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        rol: userFound.rol,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    });
   }catch(error) {
    res.status(500).json({message: error.message})
   }
};

export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200)
}