import { Request, Response } from "express";
import { OrderService } from "./order.service";
import TOrderSchema from "./order.zod";

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    //ZOD VALIDATION
    const zodUserDAta = TOrderSchema.parse(orderData);
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
