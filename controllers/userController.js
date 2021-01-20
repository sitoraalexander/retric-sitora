const db = require('../models');
const { validationResult } = require('express-validator');
const generateToken = require('../utils/generateToken');
// Defining methods for the userController
module.exports = {
  login: async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await db.User.findOne({ email });
    if (!user) {
      return res.status(404).json({ errors: [{ msg: 'Invalid Email' }] });
    }
    if (user && (await user.validPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        comments: user.comments,
        token: generateToken({
          _id: user._id,
          username: user.username,
          email: user.email,
          comments: user.comments,
        }),
      });
    } else {
      return res
        .status(401)
        .json({ errors: [{ msg: 'Invalid email or password' }] });
    }
    // Sending back a password, even a hashed password, isn't a good idea
    //  res.json({
    //    _id: req.user._id,
    //    username: req.user.username,
    //    email: req.user.email,
    //    comments: req.user.comments,
    //  });
  },

  // Route (controller) for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  signup: async function (req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { username, email, password } = req.body;

      const userExists = await db.User.findOne({ email });

      if (userExists) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      const user = await db.User.create({
        username,
        email,
        password,
      });

      if (user) {
        return res.redirect(307, '/api/user/login');
        //   return res.status(201).json({
        //     _id: user._id,
        //     username: user.username,
        //     email: user.email,
        //     token: generateToken(user._id),
        //   });
      } else {
        return res.status(400).json({ errors: [{ msg: 'Invalid user data' }] });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ errors: [{ msg: error }] });
    }
  },

  // to be implemented in the front end
  logout: function (req, res) {
    req.logout();
    res.redirect('/');
  },

  authenticate: async function (req, res) {
    // The user is not logged in, send back an empty object
    console.log(req.user);
    if (!req.user) {
      return res.status(401).end("user isn't logged in");
    } else {
      // const user = await db.User.findById(req.user.id);
      return res.json({
        _id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        comments: req.user.comments,
      });
    }
    //  return !req.user
    //    ? {}
    //    : // Otherwise send back the user's email and id
    //      // Sending back a password, even a hashed password, isn't a good idea
    //     { };
  },
};
