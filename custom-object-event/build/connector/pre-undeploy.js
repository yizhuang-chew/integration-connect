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
function preUndeploy() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiRoot = (0, create_client_1.createApiRoot)();
        yield (0, actions_1.deleteCustomerCreateSubscription)(apiRoot);
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield preUndeploy();
        }
        catch (error) {
            (0, assert_utils_1.assertError)(error);
            process.stderr.write(`Post-undeploy failed: ${error.message}\n`);
            process.exitCode = 1;
        }
    });
}
run();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlLXVuZGVwbG95LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Nvbm5lY3Rvci9wcmUtdW5kZXBsb3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBNEI7QUFDNUIsZ0JBQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQiwyREFBd0Q7QUFDeEQsd0RBQW9EO0FBQ3BELHVDQUE2RDtBQUU3RCxTQUFlLFdBQVc7O1FBQ3hCLE1BQU0sT0FBTyxHQUFHLElBQUEsNkJBQWEsR0FBRSxDQUFDO1FBQ2hDLE1BQU0sSUFBQSwwQ0FBZ0MsRUFBQyxPQUFPLENBQUMsQ0FBQztJQUNsRCxDQUFDO0NBQUE7QUFFRCxTQUFlLEdBQUc7O1FBQ2hCLElBQUksQ0FBQztZQUNILE1BQU0sV0FBVyxFQUFFLENBQUM7UUFDdEIsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDZixJQUFBLDBCQUFXLEVBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMseUJBQXlCLEtBQUssQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDO1lBQ2pFLE9BQU8sQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLENBQUM7SUFDSCxDQUFDO0NBQUE7QUFFRCxHQUFHLEVBQUUsQ0FBQyJ9