"use strict";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.region = exports.array = exports.optional = exports.getValidateMessages = exports.standardUrl = exports.standardKey = exports.standardNaturalNumber = exports.standardEmail = exports.standardString = void 0;
const validator_1 = __importDefault(require("validator"));
/**
 * File used to create helpers to validate the fields
 */
const required = (fn) => (value, ...args) => !(value === undefined || value === null) && fn(...[String(value), ...args]);
const standardString = (path, message, overrideConfig = {}) => [
    path,
    [
        [
            required(validator_1.default.isLength),
            message,
            [Object.assign({ min: 2, max: 20 }, overrideConfig)],
        ],
    ],
];
exports.standardString = standardString;
const standardEmail = (path, message) => [
    path,
    [[required(validator_1.default.isEmail), message]],
];
exports.standardEmail = standardEmail;
const standardNaturalNumber = (path, message) => [
    path,
    [
        [
            required((value) => validator_1.default.isNumeric(String(value), { no_symbols: true })),
            message,
        ],
    ],
];
exports.standardNaturalNumber = standardNaturalNumber;
const standardKey = (path, message) => [
    path,
    [
        [
            required((value) => validator_1.default.isLength(String(value), { min: 2 }) &&
                /^[a-zA-Z0-9-_]+$/.test(value)),
            message,
        ],
    ],
];
exports.standardKey = standardKey;
const standardUrl = (path, message, overrideOptions = {}) => [
    path,
    [
        [
            required(validator_1.default.isURL),
            message,
            [
                Object.assign({ require_protocol: true, require_valid_protocol: true, protocols: ['http', 'https'], require_host: true, require_port: false, allow_protocol_relative_urls: false, allow_fragments: false, allow_query_components: true, validate_length: true }, overrideOptions),
            ],
        ],
    ],
];
exports.standardUrl = standardUrl;
const getValidateMessages = (validatorConfigs, item) => validatorConfigs.flatMap(([path, validators]) => {
    return validators.reduce((acc, [validatorFn, message, args = []]) => {
        const valueToValidate = path.reduce((val, property) => {
            return val[property];
        }, item);
        if (!validatorFn(...[valueToValidate, ...args])) {
            return acc.concat(message);
        }
        return acc;
    }, []);
});
exports.getValidateMessages = getValidateMessages;
const optional = (fn) => (...args) => {
    const [path, validators] = fn(...args);
    return [
        path,
        validators.map(([fn, message, validatorArgs]) => [
            (value, ...args) => value === undefined ? true : fn(...[value, ...args]),
            message,
            validatorArgs,
        ]),
    ];
};
exports.optional = optional;
const array = (fn) => (...args) => {
    const [path, validators] = fn(...args);
    return [
        path,
        validators.map(([fn, message, validatorArgs]) => [
            (value, ...args) => Array.isArray(value) &&
                value.every((value) => fn(...[value, ...args])),
            message,
            validatorArgs,
        ]),
    ];
};
exports.array = array;
const region = (path, message) => [
    path,
    [
        [
            required(required((value) => validator_1.default.isIn(value, [
                'us-central1.gcp',
                'us-east-2.aws',
                'europe-west1.gcp',
                'eu-central-1.aws',
                'australia-southeast1.gcp',
            ]))),
            message,
        ],
    ],
];
exports.region = region;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy52YWxpZGF0b3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3ZhbGlkYXRvcnMvaGVscGVycy52YWxpZGF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw2REFBNkQ7QUFDN0QsY0FBYzs7Ozs7O0FBRWQsMERBQWtDO0FBR2xDOztHQUVHO0FBRUgsTUFBTSxRQUFRLEdBQ1osQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUNQLENBQUMsS0FBSyxFQUFFLEdBQUcsSUFBSSxFQUFFLEVBQUUsQ0FDakIsQ0FBQyxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUV6RSxNQUFNLGNBQWMsR0FBcUIsQ0FDOUMsSUFBSSxFQUNKLE9BQU8sRUFDUCxjQUFjLEdBQUcsRUFBRSxFQUNuQixFQUFFLENBQUM7SUFDSCxJQUFJO0lBQ0o7UUFDRTtZQUNFLFFBQVEsQ0FBQyxtQkFBUyxDQUFDLFFBQVEsQ0FBQztZQUM1QixPQUFPO1lBQ1AsaUJBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxJQUFLLGNBQWMsRUFBRztTQUN6QztLQUNGO0NBQ0YsQ0FBQztBQWJXLFFBQUEsY0FBYyxrQkFhekI7QUFFSyxNQUFNLGFBQWEsR0FBcUIsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQztJQUNoRSxJQUFJO0lBQ0osQ0FBQyxDQUFDLFFBQVEsQ0FBQyxtQkFBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0NBQ3pDLENBQUM7QUFIVyxRQUFBLGFBQWEsaUJBR3hCO0FBRUssTUFBTSxxQkFBcUIsR0FBRyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDO0lBQ3RELElBQUk7SUFDSjtRQUNFO1lB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