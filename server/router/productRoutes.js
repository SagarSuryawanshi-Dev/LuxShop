import { Router } from "express";
import {createProduct,getAllProducts, getProduct ,deleteProduct,categoryProduct} from "../controllers/productController.js";

const router = Router();

router.post("/createproduct",createProduct)
router.get("/allproducts",getAllProducts)
router.get("/product/:id",getProduct)
router.delete("/deleteproduct/:id",deleteProduct)


router.get("/categoryproduct/:id",categoryProduct)




export default router;