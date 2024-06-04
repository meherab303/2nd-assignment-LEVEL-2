import { Request, Response } from "express";
import { OrderService } from "./order.service";
import TOrderSchema from "./order.zod";

import { ProductService } from "../product/product.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const { productId, quantity } = orderData;

    const zodUserDAta = TOrderSchema.parse(orderData);

    const product = await ProductService.getSingleProductFromDb(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "order Not found",
      });
    }

    if (product.inventory.quantity < quantity) {
      return res.status(404).json({
        success: false,
        message: "Insufficient quantity available in inventory",
      });
    }
    //update the inventory and inStock
    product.inventory.quantity -= quantity;
    if (product.inventory.quantity === 0) {
      product.inventory.inStock = false;
    }
    //update product database
    await ProductService.updateSingleProductIntoDb(productId, product);

    const result = await OrderService.createOrderIntoDb(zodUserDAta);

    res.status(200).json({
      success: true,
      message: "ordered successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "order unsuccessful",
    });
  }
};
const getAllOrder = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    if (!email) {
      const result = await OrderService.getAllOrderFromDb();
      return res.status(200).json({
        success: true,
        message: "all order retrieve successfully",
        data: result,
      });
    }
    if (email) {
      const result = await OrderService.getSingleUserOrderFromDb(
        email.toString()
      );
      return res.status(200).json({
        success: true,
        message: "order retrieve successfully",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "order retrieve unsuccessful",
    });
  }
};
const getSingleUserOrder = async (req: Request, res: Response) => {
  try {
    const userEmail = req.query.email?.toString();
    if (userEmail) {
      const result = await OrderService.getSingleUserOrderFromDb(userEmail);
      res.status(200).json({
        success: true,
        message: "orders retrieved successfully",
        data: result,
      });
    } else {
      res.status(500).json({
        success: true,
        message: "orders retrieve unsuccessfully",
        data: "nai",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "orders retrieve unsuccessful",
    });
  }
};
export const OrderController = {
  createOrder,
  getAllOrder,
  getSingleUserOrder,
};
