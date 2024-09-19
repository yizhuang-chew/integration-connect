"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSelfCreatedChange = isSelfCreatedChange;
exports.doMessageValidation = doMessageValidation;
const custom_error_1 = __importDefault(require("../errors/custom.error"));
const decoder_utils_1 = require("../utils/decoder.utils");
const http_status_constants_1 = require("../constants/http-status.constants");
const config_utils_1 = require("../utils/config.utils");
function isSelfCreatedChange(messageBody) {
    var _a;
    const resourceModifiedBy = (_a = messageBody.createdBy) === null || _a === void 0 ? void 0 : _a.clientId;
    const currentConnectorClientId = (0, config_utils_1.readConfiguration)().clientId;
    return resourceModifiedBy === currentConnectorClientId;
}
function doMessageValidation(request) {
    if (!request.body) {
        throw new custom_error_1.default(http_status_constants_1.HTTP_STATUS_BAD_REQUEST, 'Bad request: No Pub/Sub message was received');
    }
    // Check if the body comes in a message
    if (!request.body.message) {
        throw new custom_error_1.default(http_status_constants_1.HTTP_STATUS_BAD_REQUEST, 'Bad request: Wrong No Pub/Sub message format - Missing body message');
    }
    if (!request.body.message.data) {
        throw new custom_error_1.default(http_status_constants_1.HTTP_STATUS_BAD_REQUEST, 'Bad request: Wrong No Pub/Sub message format - Missing data in body message');
    }
    const encodedMessageBody = request.body.message.data;
    const messageBody = (0, decoder_utils_1.decodeToJson)(encodedMessageBody);
    if (isSelfCreatedChange(messageBody)) {
        throw new custom_error_1.default(http_status_constants_1.HTTP_STATUS_SUCCESS_ACCEPTED, `Incoming message (ID=${messageBody.id}) is about change of ${messageBody.type} created by the current connector. Skip handling the message.`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS52YWxpZGF0b3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3ZhbGlkYXRvcnMvbWVzc2FnZS52YWxpZGF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBZUEsa0RBSUM7QUFFRCxrREFnQ0M7QUFyREQsMEVBQWlEO0FBRWpELDBEQUFzRDtBQUl0RCw4RUFHNEM7QUFFNUMsd0RBQTBEO0FBSTFELFNBQWdCLG1CQUFtQixDQUFDLFdBQWdCOztJQUNsRCxNQUFNLGtCQUFrQixHQUFHLE1BQUEsV0FBVyxDQUFDLFNBQVMsMENBQUUsUUFBUSxDQUFDO0lBQzNELE1BQU0sd0JBQXdCLEdBQUcsSUFBQSxnQ0FBaUIsR0FBRSxDQUFDLFFBQVEsQ0FBQztJQUM5RCxPQUFPLGtCQUFrQixLQUFLLHdCQUF3QixDQUFDO0FBQ3pELENBQUM7QUFFRCxTQUFnQixtQkFBbUIsQ0FBQyxPQUFnQjtJQUNsRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2xCLE1BQU0sSUFBSSxzQkFBVyxDQUNuQiwrQ0FBdUIsRUFDdkIsOENBQThDLENBQy9DLENBQUM7SUFDSixDQUFDO0lBRUQsdUNBQXVDO0lBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzFCLE1BQU0sSUFBSSxzQkFBVyxDQUNuQiwrQ0FBdUIsRUFDdkIscUVBQXFFLENBQ3RFLENBQUM7SUFDSixDQUFDO0lBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQy9CLE1BQU0sSUFBSSxzQkFBVyxDQUNuQiwrQ0FBdUIsRUFDdkIsNkVBQTZFLENBQzlFLENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTSxrQkFBa0IsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7SUFDckQsTUFBTSxXQUFXLEdBQUcsSUFBQSw0QkFBWSxFQUFDLGtCQUFrQixDQUFDLENBQUM7SUFFckQsSUFBSSxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDO1FBQ3JDLE1BQU0sSUFBSSxzQkFBVyxDQUNuQixvREFBNEIsRUFDNUIsd0JBQXdCLFdBQVcsQ0FBQyxFQUFFLHdCQUF3QixXQUFXLENBQUMsSUFBSSwrREFBK0QsQ0FDOUksQ0FBQztJQUNKLENBQUM7QUFDSCxDQUFDIn0=