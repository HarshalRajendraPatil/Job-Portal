// Class for handling the errors
class ErrorResponse extends Error {
  constructor(message, codeStatus) {
    super(message);
    this.codeStatus = codeStatus;
  }
}

// Exprting the class and not its object
module.exports = ErrorResponse;
