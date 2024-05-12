import express from "express";
import { login, register } from "../controllers/auth.js";
const router = express.Router();

// Routes

//REGISTER
router.post("/register", register);

//LOGIN
router.post("/login", login);

// End of Routes

export default router;
