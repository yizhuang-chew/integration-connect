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
exports.getProject = exports.createApiRoot = void 0;
const build_client_1 = require("./build.client");
const platform_sdk_1 = require("@commercetools/platform-sdk");
const config_utils_1 = require("../utils/config.utils");
/**
 * Create client with apiRoot
 * apiRoot can now be used to build requests to de Composable Commerce API
 */
exports.createApiRoot = ((root) => () => {
    if (root) {
        return root;
    }
    root = (0, platform_sdk_1.createApiBuilderFromCtpClient)((0, build_client_1.createClient)()).withProjectKey({
        projectKey: (0, config_utils_1.readConfiguration)().projectKey,
    });
    return root;
})();
/**
 * Example code to get the Project details
 * This code has the same effect as sending a GET
 * request to the commercetools Composable Commerce API without any endpoints.
 *
 * @returns {Promise<ClientResponse<Project>>} apiRoot
 */
const getProject = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, exports.createApiRoot)().get().execute();
});
exports.getProject = getProject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLmNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGllbnQvY3JlYXRlLmNsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxpREFBOEM7QUFFOUMsOERBQTRFO0FBQzVFLHdEQUEwRDtBQUcxRDs7O0dBR0c7QUFDVSxRQUFBLGFBQWEsR0FBRyxDQUFDLENBQUMsSUFBaUMsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFO0lBQ3hFLElBQUksSUFBSSxFQUFFLENBQUM7UUFDVCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxJQUFJLEdBQUcsSUFBQSw0Q0FBNkIsRUFBQyxJQUFBLDJCQUFZLEdBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQztRQUNsRSxVQUFVLEVBQUUsSUFBQSxnQ0FBaUIsR0FBRSxDQUFDLFVBQVU7S0FDM0MsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDLENBQUMsRUFBRSxDQUFDO0FBRUw7Ozs7OztHQU1HO0FBQ0ksTUFBTSxVQUFVLEdBQUcsR0FBUyxFQUFFO0lBQ25DLE9BQU8sTUFBTSxJQUFBLHFCQUFhLEdBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUMvQyxDQUFDLENBQUEsQ0FBQztBQUZXLFFBQUEsVUFBVSxjQUVyQiJ9