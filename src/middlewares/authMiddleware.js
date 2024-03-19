module.exports.isUserAuthenticated = function (req, res, next) {
  if (req.user) {
    return next()
  }
  return res.status(401).send('You must login first!')
}
