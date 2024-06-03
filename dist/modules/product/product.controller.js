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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_service_1 = require("./product.service");
const product_zod_1 = __importDefault(require("./product.zod"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        const zodPROductData = product_zod_1.default.parse(productData);
        const resultOfProductData = yield product_service_1.ProductService.createProductIntoDb(zodPROductData);
        res.status(200).json({
            success: true,
            message: "product  created successfully",
            data: resultOfProductData,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "product isn't created successfully",
        });
    }
});
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        if (!searchTerm) {
            const result = yield product_service_1.ProductService.getAllProductFromDb();
            return res.status(200).json({
                success: true,
                message: "All Products fetched successfully!",
                data: result,
            });
        }
        if (searchTerm) {
            const result = yield product_service_1.ProductService.getSomeProductFromDb(searchTerm);
            return res.status(200).json({
                success: true,
                message: "Some Products fetched successfully!",
                data: result,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "product isn't fetched successfully",
        });
    }
});
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productID;
        const result = yield product_service_1.ProductService.getSingleProductFromDb(id);
        res.status(200).json({
            success: true,
            message: "Single Products fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Product is not Found",
        });
    }
});
const updateSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productID;
        const updateData = req.body;
        const result = yield product_service_1.ProductService.updateSingleProductIntoDb(id, updateData);
        res.status(200).json({
            success: true,
            message: "Single Products updated successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Product is not updated",
        });
    }
});
const deleteSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productID;
        const result = yield product_service_1.ProductService.deleteSingleProductFromDb(id);
        res.status(200).json({
            success: true,
            message: "Products deleted successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Product is not deleted",
        });
    }
});
exports.ProductController = {
    createProduct,
    getAllProduct,
    getSingleProduct,
    updateSingleProduct,
    deleteSingleProduct,
};
