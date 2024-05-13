import express from "express";
import { deleteUser, modifyUser } from "../controllers/user.js";
import { verifyTokenAndAuthorization } from "../middlewares/verifyToken.js";

const router = express.Router();

// Routes

//MODIFY
router.put("/edit/:id", verifyTokenAndAuthorization, modifyUser);

//DELETE
router.delete("/delete/:id", verifyTokenAndAuthorization, deleteUser);
// End of Routes

export default router;
