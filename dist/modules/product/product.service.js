"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const product_model_1 = require("./product.model");
const mongodb_1 = require("mongodb");
const createProductIntoDb = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.create(productData);
    return result;
});
const getAllProductFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.find();
    return result;
});
const getSomeProductFromDb = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_model_1.ProductModel.find({
        $or: [{ name: { $regex: searchTerm, $options: "i" } }],
    });
    return products;
});
const getSingleProductFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.findOne({
        _id: new mongodb_1.ObjectId(id),
    });
    return result;
});
const updateSingleProductIntoDb = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.updateOne({
        _id: id,
    }, updateData);
    return result;
});
const deleteSingleProductFromDb = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.deleteOne({
        _id,
    });
    return result;
});
exports.ProductService = {
    createProductIntoDb,
    getAllProductFromDb,
    getSingleProductFromDb,
    updateSingleProductIntoDb,
    deleteSingleProductFromDb,
    getSomeProductFromDb,
};
