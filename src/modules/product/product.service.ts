import { TProduct } from "./product.interface";
import { ProductModel } from "./product.model";
import { ObjectId } from "mongodb";

const createProductIntoDb = async (productData: TProduct) => {
  const result = await ProductModel.create(productData);
  return result;
};

const getAllProductFromDb = async () => {
  const result = await ProductModel.find();
  return result;
};
const getSomeProductFromDb = async (searchTerm: string | any) => {
  const products = await ProductModel.find({
    $or: [{ name: { $regex: searchTerm, $options: "i" } }],
  });
  return products;
};
const getSingleProductFromDb = async (id: string) => {
  const result = await ProductModel.findOne({
    _id: new ObjectId(id),
  });
  return result;
};
const updateSingleProductIntoDb = async (id: string, updateData: TProduct) => {
  const result = await ProductModel.updateOne(
    {
      _id: id,
    },
    updateData
  );
  return result;
};
const deleteSingleProductFromDb = async (_id: string) => {
  const result = await ProductModel.deleteOne({
    _id,
  });
  return result;
};

export const ProductService = {
  createProductIntoDb,
  getAllProductFromDb,
  getSingleProductFromDb,
  updateSingleProductIntoDb,
  deleteSingleProductFromDb,
  getSomeProductFromDb,
};
