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
exports.post = void 0;
const custom_error_1 = __importDefault(require("../errors/custom.error"));
const logger_utils_1 = require("../utils/logger.utils");
const decoder_utils_1 = require("../utils/decoder.utils");
const http_status_constants_1 = require("../constants/http-status.constants");
const message_validators_1 = require("../validators/message.validators");
/**
 * Exposed event POST endpoint.
 * Receives the Pub/Sub message and works with it
 *
 * @param {Request} request The express request
 * @param {Response} response The express response
 * @returns
 */
const post = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_utils_1.logger.info('Event Received', request);
        // Message Validation
        (0, message_validators_1.doMessageValidation)(request);
        // TODO - Handle all changes
        const encodedMessageBody = request.body.message.data;
        const messageBody = (0, decoder_utils_1.decodeToJson)(encodedMessageBody);
        logger_utils_1.logger.info("messageBody", messageBody);
        const resource = messageBody.resource;
        logger_utils_1.logger.info("resource", resource);
    }
    catch (error) {
        if (error instanceof custom_error_1.default) {
            response.status(error.statusCode).send();
            logger_utils_1.logger.error(error);
            return;
        }
        throw new custom_error_1.default(http_status_constants_1.HTTP_STATUS_BAD_REQUEST, `Bad request: ${error}`);
    }
});
exports.post = post;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tT2JqZWN0LmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJvbGxlcnMvY3VzdG9tT2JqZWN0LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBR0EsMEVBQWlEO0FBQ2pELHdEQUErQztBQUUvQywwREFBc0Q7QUFFdEQsOEVBRzRDO0FBRTVDLHlFQUF1RTtBQUd2RTs7Ozs7OztHQU9HO0FBQ0ksTUFBTSxJQUFJLEdBQUcsQ0FBTyxPQUFnQixFQUFFLFFBQWtCLEVBQUUsRUFBRTtJQUVqRSxJQUFHLENBQUM7UUFFRixxQkFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN2QyxxQkFBcUI7UUFDckIsSUFBQSx3Q0FBbUIsRUFBQyxPQUFPLENBQUMsQ0FBQztRQUU3Qiw0QkFBNEI7UUFDNUIsTUFBTSxrQkFBa0IsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDckQsTUFBTSxXQUFXLEdBQUcsSUFBQSw0QkFBWSxFQUFDLGtCQUFrQixDQUFDLENBQUM7UUFFckQscUJBQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBRXhDLE1BQU0sUUFBUSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUM7UUFFdEMscUJBQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBR3BDLENBQUM7SUFBQSxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2QsSUFBSSxLQUFLLFlBQVksc0JBQVcsRUFBRSxDQUFDO1lBQ2pDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQW9CLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNuRCxxQkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwQixPQUFPO1FBQ1QsQ0FBQztRQUNELE1BQU0sSUFBSSxzQkFBVyxDQUFDLCtDQUF1QixFQUFFLGdCQUFnQixLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQzFFLENBQUM7QUFDSCxDQUFDLENBQUEsQ0FBQztBQTNCVyxRQUFBLElBQUksUUEyQmYifQ==