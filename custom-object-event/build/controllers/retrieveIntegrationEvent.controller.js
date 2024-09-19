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
exports.retrieveIntegrationEvent = void 0;
const create_client_1 = require("../client/create.client");
const logger_utils_1 = require("../utils/logger.utils");
const INTEGRATION_SETUP_CONTAINER = 'integration_setup';
const INTEGRATION_SETUP_KEY = 'integration_event';
const custom_error_1 = __importDefault(require("../errors/custom.error"));
const http_status_constants_1 = require("../constants/http-status.constants");
const retrieveIntegrationEvent = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, create_client_1.createApiRoot)()
            .customObjects()
            .get({
            queryArgs: {
                where: `container="${INTEGRATION_SETUP_CONTAINER}" AND key="${INTEGRATION_SETUP_KEY}"`,
            },
        })
            .execute();
        if (response.body.results.length > 0) {
            const customObject = response.body.results[0];
            logger_utils_1.logger.info('Custom Object Retrieved:', customObject);
            return customObject;
        }
        else {
            throw new custom_error_1.default(http_status_constants_1.HTTP_STATUS_BAD_REQUEST, `No custom object found for the given container and key.`);
            logger_utils_1.logger.info('No custom object found for the given container and key.');
        }
    }
    catch (error) {
        throw new custom_error_1.default(http_status_constants_1.HTTP_STATUS_BAD_REQUEST, `Bad request: ${error}`);
    }
});
exports.retrieveIntegrationEvent = retrieveIntegrationEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV0cmlldmVJbnRlZ3JhdGlvbkV2ZW50LmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJvbGxlcnMvcmV0cmlldmVJbnRlZ3JhdGlvbkV2ZW50LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkRBQXdEO0FBRXhELHdEQUErQztBQUUvQyxNQUFNLDJCQUEyQixHQUFHLG1CQUFtQixDQUFDO0FBRXhELE1BQU0scUJBQXFCLEdBQUcsbUJBQW1CLENBQUM7QUFDbEQsMEVBQWlEO0FBRWpELDhFQUc0QztBQUVyQyxNQUFNLHdCQUF3QixHQUFHLEdBQXVCLEVBQUU7SUFDL0QsSUFBSSxDQUFDO1FBQ0gsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFBLDZCQUFhLEdBQUU7YUFDbkMsYUFBYSxFQUFFO2FBQ2YsR0FBRyxDQUFDO1lBQ0gsU0FBUyxFQUFFO2dCQUNULEtBQUssRUFBRSxjQUFjLDJCQUEyQixjQUFjLHFCQUFxQixHQUFHO2FBQ3ZGO1NBQ0YsQ0FBQzthQUNELE9BQU8sRUFBRSxDQUFDO1FBRWIsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDckMsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUMscUJBQU0sQ0FBQyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDdEQsT0FBTyxZQUFZLENBQUM7UUFDdEIsQ0FBQzthQUFNLENBQUM7WUFDTixNQUFNLElBQUksc0JBQVcsQ0FDbkIsK0NBQXVCLEVBQ3ZCLHlEQUF5RCxDQUMxRCxDQUFDO1lBQ0YscUJBQU0sQ0FBQyxJQUFJLENBQUMseURBQXlELENBQUMsQ0FBQztRQUN6RSxDQUFDO0lBQ0gsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixNQUFNLElBQUksc0JBQVcsQ0FBQywrQ0FBdUIsRUFBRSxnQkFBZ0IsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUMxRSxDQUFDO0FBQ0gsQ0FBQyxDQUFBLENBQUM7QUF6QlcsUUFBQSx3QkFBd0IsNEJBeUJuQyJ9