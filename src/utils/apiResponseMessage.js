class SuccessfulResponse {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }
}

class ErrorResponse {
    constructor(code, message, errors) {
        this.code = code;
        this.message = message;
        this.errors = errors;
    }
}

module.exports = { SuccessfulResponse, ErrorResponse }