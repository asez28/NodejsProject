import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authRequired = (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        console.log("No token, authorization denied");
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) {
            console.error("Error verifying token:", err);
            return res.status(403).json({ message: "Invalid Token" });
        }

        console.log("User rol:", user.rol);
        console.log("Request URL:", req.originalUrl);

        // Rutas que requieren roles específicos
        const routesWithRoles = {
            "/api/users": ["admin"],
            "/api/task": ["Pro", "admin"],
        };

        const allowedRoles = routesWithRoles[req.originalUrl] || [];

        if (allowedRoles.length === 0 || allowedRoles.includes(user.rol)) {
            req.user = user;
            next();
        } else {
            console.log("Access denied");
            return res.status(403).json({ message: "No tienes permisos para acceder a esta ruta." });
        }
    });
};
