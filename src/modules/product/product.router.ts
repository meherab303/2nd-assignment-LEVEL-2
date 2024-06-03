import express from "express";
import { ProductController } from "./product.controller";

const router = express.Router();

router.post("/create-product", ProductController.createProduct);
router.get("/", ProductController.getAllProduct);
router.get("/:productID", ProductController.getSingleProduct);
router.put("/:productID", ProductController.updateSingleProduct);
router.delete("/:productID", ProductController.deleteSingleProduct);

export const ProductRouter = router;
