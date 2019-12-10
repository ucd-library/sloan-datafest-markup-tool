module.exports = (req, res, next) => {
  if( !req.session.cas_user ) {
    return res.status(401).json({error: true, message: 'please login'});
  }
  next();
}