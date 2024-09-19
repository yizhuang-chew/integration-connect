"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_validators_1 = require("./helpers.validators");
/**
 * Create here your own validators
 */
const envValidators = [
    (0, helpers_validators_1.standardString)(['clientId'], {
        code: 'InValidClientId',
        message: 'Client id should be 24 characters.',
        referencedBy: 'environmentVariables',
    }, { min: 24, max: 24 }),
    (0, helpers_validators_1.standardString)(['clientSecret'], {
        code: 'InvalidClientSecret',
        message: 'Client secret should be 32 characters.',
        referencedBy: 'environmentVariables',
    }, { min: 32, max: 32 }),
    (0, helpers_validators_1.standardKey)(['projectKey'], {
        code: 'InvalidProjectKey',
        message: 'Project key should be a valid string.',
        referencedBy: 'environmentVariables',
    }),
    (0, helpers_validators_1.optional)(helpers_validators_1.standardString)(['scope'], {
        code: 'InvalidScope',
        message: 'Scope should be at least 2 characters long.',
        referencedBy: 'environmentVariables',
    }, { min: 2, max: undefined }),
    (0, helpers_validators_1.region)(['region'], {
        code: 'InvalidRegion',
        message: 'Not a valid region.',
        referencedBy: 'environmentVariables',
    }),
];
exports.default = envValidators;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52LnZhbGlkYXRvcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdmFsaWRhdG9ycy9lbnYudmFsaWRhdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZEQUs4QjtBQUU5Qjs7R0FFRztBQUNILE1BQU0sYUFBYSxHQUFHO0lBQ3BCLElBQUEsbUNBQWMsRUFDWixDQUFDLFVBQVUsQ0FBQyxFQUNaO1FBQ0UsSUFBSSxFQUFFLGlCQUFpQjtRQUN2QixPQUFPLEVBQUUsb0NBQW9DO1FBQzdDLFlBQVksRUFBRSxzQkFBc0I7S0FDckMsRUFDRCxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUNyQjtJQUVELElBQUEsbUNBQWMsRUFDWixDQUFDLGNBQWMsQ0FBQyxFQUNoQjtRQUNFLElBQUksRUFBRSxxQkFBcUI7UUFDM0IsT0FBTyxFQUFFLHdDQUF3QztRQUNqRCxZQUFZLEVBQUUsc0JBQXNCO0tBQ3JDLEVBQ0QsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FDckI7SUFFRCxJQUFBLGdDQUFXLEVBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRTtRQUMxQixJQUFJLEVBQUUsbUJBQW1CO1FBQ3pCLE9BQU8sRUFBRSx1Q0FBdUM7UUFDaEQsWUFBWSxFQUFFLHNCQUFzQjtLQUNyQyxDQUFDO0lBRUYsSUFBQSw2QkFBUSxFQUFDLG1DQUFjLENBQUMsQ0FDdEIsQ0FBQyxPQUFPLENBQUMsRUFDVDtRQUNFLElBQUksRUFBRSxjQUFjO1FBQ3BCLE9BQU8sRUFBRSw2Q0FBNkM7UUFDdEQsWUFBWSxFQUFFLHNCQUFzQjtLQUNyQyxFQUNELEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLENBQzNCO0lBRUQsSUFBQSwyQkFBTSxFQUFDLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDakIsSUFBSSxFQUFFLGVBQWU7UUFDckIsT0FBTyxFQUFFLHFCQUFxQjtRQUM5QixZQUFZLEVBQUUsc0JBQXNCO0tBQ3JDLENBQUM7Q0FDSCxDQUFDO0FBRUYsa0JBQWUsYUFBYSxDQUFDIn0=