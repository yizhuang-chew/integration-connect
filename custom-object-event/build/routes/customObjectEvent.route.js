"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logger_utils_1 = require("../utils/logger.utils");
const customObject_controller_1 = require("../controllers/customObject.controller");
const eventRouter = (0, express_1.Router)();
eventRouter.post('/', (req, res, next) => {
    logger_utils_1.logger.info('Event message received');
    try {
        (0, customObject_controller_1.post)(req, res);
    }
    catch (error) {
        next(error);
    }
});
exports.default = eventRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tT2JqZWN0RXZlbnQucm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcm91dGVzL2N1c3RvbU9iamVjdEV2ZW50LnJvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBQWlDO0FBRWpDLHdEQUErQztBQUMvQyxvRkFBOEQ7QUFFOUQsTUFBTSxXQUFXLEdBQVcsSUFBQSxnQkFBTSxHQUFFLENBQUM7QUFFckMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO0lBQ3ZDLHFCQUFNLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7SUFDdEMsSUFBSSxDQUFDO1FBQ0gsSUFBQSw4QkFBSSxFQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNkLENBQUM7QUFDSCxDQUFDLENBQUMsQ0FBQztBQUVILGtCQUFlLFdBQVcsQ0FBQyJ9