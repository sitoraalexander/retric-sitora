const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  //Get token from header
  const token = req.header('x-auth-token');
  console.log(token);
  //Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'abc123');
    console.log(decoded.user);
    req.user = decoded.user;
    // console.log('decode', req.user);
    //
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
