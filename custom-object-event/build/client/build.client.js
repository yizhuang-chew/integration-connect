"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClient = void 0;
const sdk_client_v2_1 = require("@commercetools/sdk-client-v2");
const auth_middleware_1 = require("../middleware/auth.middleware");
const http_middleware_1 = require("../middleware/http.middleware");
const config_utils_1 = require("../utils/config.utils");
/**
 * Create a new client builder.
 * This code creates a new Client that can be used to make API calls
 */
const createClient = () => new sdk_client_v2_1.ClientBuilder()
    .withProjectKey((0, config_utils_1.readConfiguration)().projectKey)
    .withClientCredentialsFlow(auth_middleware_1.authMiddlewareOptions)
    .withHttpMiddleware(http_middleware_1.httpMiddlewareOptions)
    .build();
exports.createClient = createClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQuY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NsaWVudC9idWlsZC5jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsZ0VBQTZEO0FBQzdELG1FQUFzRTtBQUN0RSxtRUFBc0U7QUFDdEUsd0RBQTBEO0FBRTFEOzs7R0FHRztBQUNJLE1BQU0sWUFBWSxHQUFHLEdBQUcsRUFBRSxDQUMvQixJQUFJLDZCQUFhLEVBQUU7S0FDaEIsY0FBYyxDQUFDLElBQUEsZ0NBQWlCLEdBQUUsQ0FBQyxVQUFVLENBQUM7S0FDOUMseUJBQXlCLENBQUMsdUNBQXFCLENBQUM7S0FDaEQsa0JBQWtCLENBQUMsdUNBQXFCLENBQUM7S0FDekMsS0FBSyxFQUFFLENBQUM7QUFMQSxRQUFBLFlBQVksZ0JBS1oifQ==