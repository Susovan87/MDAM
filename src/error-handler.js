var ErrorHandler = function () {
}

ErrorHandler.prototype.logErrors = function(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

ErrorHandler.prototype.clientErrorHandler = function(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something blew up!' });
  } else {
    next(err);
  }
}

ErrorHandler.prototype.errorHandler = function(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}

module.exports = ErrorHandler;