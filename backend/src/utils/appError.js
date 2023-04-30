let AppError = class Errors extends Error {
    status;
    isOperational;
  
    constructor(message, statusCode = 500) {
      super(message);
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.isOperational = true;
  
      Error.captureStackTrace(this, this.constructor);
    }
  };

export default AppError