module.exports = (res, error) => {
  res.status(500)
    .json({
      error: true,
      message : error.message,
      stack : error.stack
    });
}