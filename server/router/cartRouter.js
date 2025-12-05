import express from "express";
import {addToCart} from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/addtocart", addToCart)

export default cartRouter;