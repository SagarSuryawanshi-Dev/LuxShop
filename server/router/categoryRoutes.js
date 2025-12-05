import {Router} from "express";

import { createCategory,getAllCategory, updatecategory ,deletecategory} from "../controllers/categoryController.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router()

router.post('/createcategories', createCategory)
router.get('/getallcategories',getAllCategory)
router.put("/updatecategory/:id",updatecategory)
router.delete("/deletecategory/:id",deletecategory)


export default router;