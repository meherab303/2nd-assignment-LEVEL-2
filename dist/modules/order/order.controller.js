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
exports.OrderController = void 0;
const order_service_1 = require("./order.service");
const order_zod_1 = __importDefault(require("./order.zod"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        //ZOD VALIDATION
        const zodUserDAta = order_zod_1.default.parse(orderData);
        const result = yield order_service_1.OrderService.createOrderIntoDb(zodUserDAta);
        res.status(200).json({
            success: true,
            message: "ordered successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "order unsuccessful",
        });
    }
});
const getAllOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.query;
        if (!email) {
            const result = yield order_service_1.OrderService.getAllOrderFromDb();
            return res.status(200).json({
                success: true,
                message: "all order retrieve successfully",
                data: result,
            });
        }
        if (email) {
            const result = yield order_service_1.OrderService.getSingleUserOrderFromDb(email.toString());
            return res.status(200).json({
                success: true,
                message: "order retrieve successfully",
                data: result,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "order retrieve unsuccessful",
        });
    }
});
const getSingleUserOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userEmail = (_a = req.query.email) === null || _a === void 0 ? void 0 : _a.toString();
        if (userEmail) {
            const result = yield order_service_1.OrderService.getSingleUserOrderFromDb(userEmail);
            res.status(200).json({
                success: true,
                message: "orders retrieved successfully",
                data: result,
            });
        }
        else {
            res.status(500).json({
                success: true,
                message: "orders retrieve unsuccessfully",
                data: "nai",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "orders retrieve unsuccessful",
        });
    }
});
exports.OrderController = {
    createOrder,
    getAllOrder,
    getSingleUserOrder,
};
