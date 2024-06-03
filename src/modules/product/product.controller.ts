import { Request, Response } from "express";
import { ProductService } from "./product.service";
import TProductSchema from "./product.zod";

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    const zodPROductData = TProductSchema.parse(productData);

    const resultOfProductData =
      await ProductService.createProductIntoDb(zodPROductData);

    res.status(200).json({
      success: true,
      message: "product  created successfully",
      data: resultOfProductData,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "product isn't created successfully",
    });
  }
};

const getAllProduct = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;

    if (!searchTerm) {
      const result = await ProductService.getAllProductFromDb();

      return res.status(200).json({
        success: true,
        message: "All Products fetched successfully!",
        data: result,
      });
    }
    if (searchTerm) {
      const result = await ProductService.getSomeProductFromDb(searchTerm);

      return res.status(200).json({
        success: true,
        message: "Some Products fetched successfully!",
        data: result,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "product isn't fetched successfully",
    });
  }
};
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.productID;

    const result = await ProductService.getSingleProductFromDb(id);

    res.status(200).json({
      success: true,
      message: "Single Products fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Product is not Found",
    });
  }
};

const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.productID;
    const updateData = req.body;

    const result = await ProductService.updateSingleProductIntoDb(
      id,
      updateData
    );

    res.status(200).json({
      success: true,
      message: "Single Products updated successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Product is not updated",
    });
  }
};
const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.productID;

    const result = await ProductService.deleteSingleProductFromDb(id);

    res.status(200).json({
      success: true,
      message: "Products deleted successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Product is not deleted",
    });
  }
};
export const ProductController = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
};
