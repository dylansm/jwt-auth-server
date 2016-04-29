const User = require('../models/user')
const jwt = require('jwt-simple')
const config = require('../config.js')

function tokenForUser(user) {
  const timestamp = new Date().getTime()
  return jwt.encode({ sub: user.id, iat: timestamp }, config[process.env.NODE_ENV].jwt_secret)
}

exports.signin = function(req, res, next) {
  // passport sets user (passed in done callback)
  res.send({ token: tokenForUser(req.user)})
}

exports.signup = function(req, res, next) {
  const email = req.body.email
  const password = req.body.password

  if (!email || !password) {
    return res.status(422).send({ error: "Email and password required."})
  }

  // See if user exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return next(err)
    }

    if (existingUser) {
      return res.status(422).send({ error: "Email is in use." })
    }
  })

  // If a user with email exists, return an error
  const user = new User({
    email: email,
    password: password
  })

  user.save(function(err) {
    if (err) {
      return next(err)
    }

    res.json({ token: tokenForUser(user) })
  })

  // if a user with email does NOT exist, create and save user record

  // Respond to request indicating success or failure
}
