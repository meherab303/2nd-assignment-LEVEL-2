"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
exports.default = {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
};
