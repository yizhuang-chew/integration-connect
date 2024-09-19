"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomError extends Error {
    constructor(statusCode, message, errors) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        if (errors) {
            this.errors = errors;
        }
    }
}
exports.default = CustomError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLmVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Vycm9ycy9jdXN0b20uZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFNQSxNQUFNLFdBQVksU0FBUSxLQUFLO0lBSzdCLFlBQ0UsVUFBMkIsRUFDM0IsT0FBZSxFQUNmLE1BQW9CO1FBRXBCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksTUFBTSxFQUFFLENBQUM7WUFDWCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUN2QixDQUFDO0lBQ0gsQ0FBQztDQUNGO0FBRUQsa0JBQWUsV0FBVyxDQUFDIn0=