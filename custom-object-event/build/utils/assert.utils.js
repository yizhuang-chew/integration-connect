"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assert = assert;
exports.assertError = assertError;
exports.assertString = assertString;
function assert(condition, message) {
    if (!condition) {
        throw new Error(`Assertion failed: ${message}`);
    }
}
function assertError(value, message) {
    assert(value instanceof Error, message !== null && message !== void 0 ? message : 'Invalid error value');
}
function assertString(value, message) {
    assert(typeof value === 'string', message !== null && message !== void 0 ? message : 'Invalid string value');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXJ0LnV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2Fzc2VydC51dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdCQUlDO0FBRUQsa0NBS0M7QUFFRCxvQ0FLQztBQWxCRCxTQUFnQixNQUFNLENBQUMsU0FBa0IsRUFBRSxPQUFlO0lBQ3hELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDbEQsQ0FBQztBQUNILENBQUM7QUFFRCxTQUFnQixXQUFXLENBQ3pCLEtBQWMsRUFDZCxPQUFnQjtJQUVoQixNQUFNLENBQUMsS0FBSyxZQUFZLEtBQUssRUFBRSxPQUFPLGFBQVAsT0FBTyxjQUFQLE9BQU8sR0FBSSxxQkFBcUIsQ0FBQyxDQUFDO0FBQ25FLENBQUM7QUFFRCxTQUFnQixZQUFZLENBQzFCLEtBQWMsRUFDZCxPQUFnQjtJQUVoQixNQUFNLENBQUMsT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFLE9BQU8sYUFBUCxPQUFPLGNBQVAsT0FBTyxHQUFJLHNCQUFzQixDQUFDLENBQUM7QUFDdkUsQ0FBQyJ9