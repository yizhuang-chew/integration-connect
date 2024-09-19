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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const create_client_1 = require("../client/create.client");
const assert_utils_1 = require("../utils/assert.utils");
const actions_1 = require("./actions");
const CONNECT_GCP_TOPIC_NAME_KEY = 'CONNECT_GCP_TOPIC_NAME';
const CONNECT_GCP_PROJECT_ID_KEY = 'CONNECT_GCP_PROJECT_ID';
function postDeploy(properties) {
    return __awaiter(this, void 0, void 0, function* () {
        const topicName = properties.get(CONNECT_GCP_TOPIC_NAME_KEY);
        const projectId = properties.get(CONNECT_GCP_PROJECT_ID_KEY);
        (0, assert_utils_1.assertString)(topicName, CONNECT_GCP_TOPIC_NAME_KEY);
        (0, assert_utils_1.assertString)(projectId, CONNECT_GCP_PROJECT_ID_KEY);
        const apiRoot = (0, create_client_1.createApiRoot)();
        yield (0, actions_1.createCustomerCreateSubscription)(apiRoot, topicName, projectId);
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const properties = new Map(Object.entries(process.env));
            yield postDeploy(properties);
        }
        catch (error) {
            (0, assert_utils_1.assertError)(error);
            process.stderr.write(`Post-deploy failed: ${error.message}\n`);
            process.exitCode = 1;
        }
    });
}
run();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdC1kZXBsb3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29ubmVjdG9yL3Bvc3QtZGVwbG95LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQTRCO0FBQzVCLGdCQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEIsMkRBQXdEO0FBQ3hELHdEQUFrRTtBQUNsRSx1Q0FBNkQ7QUFFN0QsTUFBTSwwQkFBMEIsR0FBRyx3QkFBd0IsQ0FBQztBQUM1RCxNQUFNLDBCQUEwQixHQUFHLHdCQUF3QixDQUFDO0FBRTVELFNBQWUsVUFBVSxDQUFDLFVBQWdDOztRQUN4RCxNQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFDN0QsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBRTdELElBQUEsMkJBQVksRUFBQyxTQUFTLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztRQUNwRCxJQUFBLDJCQUFZLEVBQUMsU0FBUyxFQUFFLDBCQUEwQixDQUFDLENBQUM7UUFFcEQsTUFBTSxPQUFPLEdBQUcsSUFBQSw2QkFBYSxHQUFFLENBQUM7UUFDaEMsTUFBTSxJQUFBLDBDQUFnQyxFQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDeEUsQ0FBQztDQUFBO0FBRUQsU0FBZSxHQUFHOztRQUNoQixJQUFJLENBQUM7WUFDSCxNQUFNLFVBQVUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3hELE1BQU0sVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9CLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2YsSUFBQSwwQkFBVyxFQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHVCQUF1QixLQUFLLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQztZQUMvRCxPQUFPLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztRQUN2QixDQUFDO0lBQ0gsQ0FBQztDQUFBO0FBRUQsR0FBRyxFQUFFLENBQUMifQ==