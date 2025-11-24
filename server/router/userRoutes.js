import { Router } from "express";
import { regsiterUser } from "../controllers/userController.js";
const router = Router();

router.post("/register",regsiterUser)




export default router;
