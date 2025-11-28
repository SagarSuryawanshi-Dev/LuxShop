import { Router } from "express";
import {createProduct,getAllProducts, getProduct} from "../controllers/productController.js";

const router = Router();

router.post("/createproduct",createProduct)
router.get("/allproducts",getAllProducts)
router.get("/product/:id",getProduct)




export default router;