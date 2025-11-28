import { Router } from "express";
import { registerUser, loginUser, logoutUser,getUserProfile }from "../controllers/userController.js";
const router = Router();

router.post("/register",registerUser)
router.post("/login", loginUser)
router.post('/logout', logoutUser)
router.get('/profile/:id', getUserProfile)




export default router;
