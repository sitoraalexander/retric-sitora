const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  console.log(user);
  return jwt.sign({ user: user }, 'abc123', {
    expiresIn: '30d',
  });
};

module.exports = generateToken;
