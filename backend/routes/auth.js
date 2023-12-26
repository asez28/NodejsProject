import { Router } from "express";
import { register } from "../controllers/registerController.js";
import { login, logout } from "../controllers/loginController.js";
import { profile } from "../controllers/profileController.js";
import { authRequired } from "../middlewares/validateToken.js";
import { getUsers } from "../controllers/usersController.js";
import { validateSchema } from "../middlewares/validatorMiddleware.js";
import { registerSchema, loginSchema } from "../schemas/authSchema.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);

router.route("/profile").get(authRequired, profile).post(authRequired, profile);

router.get("/users", authRequired, getUsers);

export default router;
