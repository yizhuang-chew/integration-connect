"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readConfiguration = void 0;
const custom_error_1 = __importDefault(require("../errors/custom.error"));
const env_validators_1 = __importDefault(require("../validators/env.validators"));
const helpers_validators_1 = require("../validators/helpers.validators");
/**
 * Read the configuration env vars
 * (Add yours accordingly)
 *
 * @returns The configuration with the correct env vars
 */
const readConfiguration = () => {
    const envVars = {
        clientId: process.env.CTP_CLIENT_ID,
        clientSecret: process.env.CTP_CLIENT_SECRET,
        projectKey: process.env.CTP_PROJECT_KEY,
        scope: process.env.CTP_SCOPE,
        region: process.env.CTP_REGION,
    };
    const validationErrors = (0, helpers_validators_1.getValidateMessages)(env_validators_1.default, envVars);
    if (validationErrors.length) {
        throw new custom_error_1.default('InvalidEnvironmentVariablesError', 'Invalid Environment Variables please check your .env file', validationErrors);
    }
    return envVars;
};
exports.readConfiguration = readConfiguration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2NvbmZpZy51dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSwwRUFBaUQ7QUFDakQsa0ZBQXlEO0FBQ3pELHlFQUF1RTtBQUV2RTs7Ozs7R0FLRztBQUNJLE1BQU0saUJBQWlCLEdBQUcsR0FBRyxFQUFFO0lBQ3BDLE1BQU0sT0FBTyxHQUFHO1FBQ2QsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBdUI7UUFDN0MsWUFBWSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQTJCO1FBQ3JELFVBQVUsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQXlCO1FBQ2pELEtBQUssRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVM7UUFDNUIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBb0I7S0FDekMsQ0FBQztJQUVGLE1BQU0sZ0JBQWdCLEdBQUcsSUFBQSx3Q0FBbUIsRUFBQyx3QkFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBRXJFLElBQUksZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDNUIsTUFBTSxJQUFJLHNCQUFXLENBQ25CLGtDQUFrQyxFQUNsQywyREFBMkQsRUFDM0QsZ0JBQWdCLENBQ2pCLENBQUM7SUFDSixDQUFDO0lBRUQsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQyxDQUFDO0FBcEJXLFFBQUEsaUJBQWlCLHFCQW9CNUIifQ==