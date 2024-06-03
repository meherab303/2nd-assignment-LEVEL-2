import { TOrder } from "./order.interface";
import { OrderModel } from "./order.model";

const createOrderIntoDb = async (data: TOrder) => {
  const result = await OrderModel.create(data);
  return result;
};
const getAllOrderFromDb = async () => {
  const result = await OrderModel.find();

  return result;
};
const getSingleUserOrderFromDb = async (email: string) => {
  const result = await OrderModel.aggregate([{ $match: { email: email } }]);
  return result;
};

export const OrderService = {
  createOrderIntoDb,
  getAllOrderFromDb,
  getSingleUserOrderFromDb,
};
