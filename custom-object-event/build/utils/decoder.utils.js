"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToJson = void 0;
const decodeToString = (encodedMessageBody) => {
    const buff = Buffer.from(encodedMessageBody, 'base64');
    return buff.toString().trim();
};
const decodeToJson = (encodedMessageBody) => {
    const decodedString = decodeToString(encodedMessageBody);
    return JSON.parse(decodedString);
};
exports.decodeToJson = decodeToJson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb2Rlci51dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9kZWNvZGVyLnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQU0sY0FBYyxHQUFHLENBQUMsa0JBQTBCLEVBQUUsRUFBRTtJQUNsRCxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZELE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ2hDLENBQUMsQ0FBQztBQUVLLE1BQU0sWUFBWSxHQUFHLENBQUMsa0JBQTBCLEVBQUUsRUFBRTtJQUN6RCxNQUFNLGFBQWEsR0FBRyxjQUFjLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUN6RCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDbkMsQ0FBQyxDQUFDO0FBSFcsUUFBQSxZQUFZLGdCQUd2QiJ9