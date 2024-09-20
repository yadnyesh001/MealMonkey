// // auth.js

// // Define an object to hold all the error messages
// const authErrors = {
//     USER_NOT_FOUND: {
//         code: 404,
//         message: "User not found. Please check the provided credentials."
//     },
//     INVALID_PASSWORD: {
//         code: 401,
//         message: "Invalid password. Please try again."
//     },
//     USER_ALREADY_EXISTS: {
//         code: 409,
//         message: "User already exists. Please use a different email."
//     },
//     TOKEN_EXPIRED: {
//         code: 401,
//         message: "Session expired. Please log in again."
//     },
//     UNAUTHORIZED_ACCESS: {
//         code: 403,
//         message: "You are not authorized to access this resource."
//     },
//     MISSING_CREDENTIALS: {
//         code: 400,
//         message: "Missing credentials. Please provide email and password."
//     },
//     TOKEN_NOT_PROVIDED: {
//         code: 400,
//         message: "Authentication token not provided."
//     },
//     INVALID_TOKEN: {
//         code: 401,
//         message: "Invalid token. Please log in again."
//     }
// };

// Export the error object so it can be used in other files
// class ErrorController {
//     constructor() {
//         this.errors = {
//             SERVER_ERROR: {code: 500, message: "Server not running"},
//             DATABASE_ERROR: { code: 500, message: "Database  " },
//             NOT_FOUND: { code: 404, message: "Resource not found" },
//             UNAUTHORIZED: { code: 401, message: "Unauthorized access" },
//             // Add more errors as needed
//         };
//     }

//     getError(errorType) {
//         return this.errors[errorType] || this.errors.SERVER_ERROR;
//     }
// }

// module.exports = new ErrorController();


//Do not Refer 