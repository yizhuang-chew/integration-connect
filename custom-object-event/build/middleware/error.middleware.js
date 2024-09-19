"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const custom_error_1 = __importDefault(require("../errors/custom.error"));
const errorMiddleware = (error, _, res) => {
    const isDevelopment = process.env.NODE_ENV === 'development';
    if (error instanceof custom_error_1.default) {
        res.status(error.statusCode).json({
            message: error.message,
            errors: error.errors,
            stack: isDevelopment ? error.stack : undefined,
        });
        return;
    }
    res.status(500).send(isDevelopment ? error : 'Internal server error');
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IubWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taWRkbGV3YXJlL2Vycm9yLm1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsMEVBQWlEO0FBRTFDLE1BQU0sZUFBZSxHQUF3QixDQUNsRCxLQUFZLEVBQ1osQ0FBVSxFQUNWLEdBQWEsRUFDYixFQUFFO0lBQ0YsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssYUFBYSxDQUFDO0lBRTdELElBQUksS0FBSyxZQUFZLHNCQUFXLEVBQUUsQ0FBQztRQUNqQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFvQixDQUFDLENBQUMsSUFBSSxDQUFDO1lBQzFDLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTztZQUN0QixNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU07WUFDcEIsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUztTQUMvQyxDQUFDLENBQUM7UUFFSCxPQUFPO0lBQ1QsQ0FBQztJQUVELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0FBQ3hFLENBQUMsQ0FBQztBQWxCVyxRQUFBLGVBQWUsbUJBa0IxQiJ9