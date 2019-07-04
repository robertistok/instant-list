class NotAllowedError extends Error {
  constructor(message) {
    super();

    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.message = message || "You cannot do that!";
    this.status = 403;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super();

    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.message = message || "Not found...";
    this.status = 404;
  }
}

module.exports = { NotAllowedError, NotFoundError };
