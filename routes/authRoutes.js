import { Router } from "express";
import { login, logout, register } from "../controllers/authController.js";
import { validateRegisterInput } from "../middleware/validationMiddleware.js";

const router=Router()
router.post('/register',validateRegisterInput,  register)
router.post('/login',login)
router.get('/logout',logout)

export default router