const router = require('express').Router();
const userController = require('../../controllers/userController');
// Requiring passport as we've configured it
const passport = require('../../utils/passport');
const { check } = require('express-validator');
const auth = require('../../middlewares/auth');
// Matches with "/api/user/login"
router
  .route('/login')
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  .post(
    [
      check('email', 'Please include a valid email').isEmail(),
      check('password', 'Password is Required').not().isEmpty(),
    ],
    userController.login
  );

// Matches with "/api/user/signup"
router
  .route('/signup')
  .post(
    [
      check('username', 'Username is Required').not().isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
      check('password', 'Password is Required').not().isEmpty(),
    ],
    userController.signup
  );

// Matches with "/api/user/logout"
router
  .route('/logout')
  // Route for logging user out
  .get(userController.logout);

// Matches with "/api/user/authenticate"
router
  .route('/authenticate')
  // Route for getting some data about our user to be used client side
  .post(auth, userController.authenticate);

module.exports = router;
