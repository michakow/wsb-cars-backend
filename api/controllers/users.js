const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.getUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      res.status(200).json({
        message: 'user list',
        users,
      });
    })
    .catch((err) =>
      res.status(500).json({
        message: 'Nie udało się odczytać listy',
      })
    );
};

exports.signUp = (req, res, next) => {
  User.findOne({
    email: req.body.email,
  }).then((user) => {
    if (user) {
      res.status(400).json({
        message: 'Taki użytkownik istnieje',
      });
    } else {
      bcrypt.hash(req.body.password, 10).then((password) => {
        const user = new User({
          email: req.body.email,
          password,
        });
        user
          .save()
          .then(() =>
            res.status(201).json({
              message: 'Dodano użytkownika',
            })
          )
          .catch((error) =>
            res.status(400).json({
              message: 'Nie udało się dodać użytkownika',
              error,
            })
          );
      });
    }
  });
};

exports.signIn = (req, res, next) => {
  User.findOne({
    email: req.body.email,
  }).then((user) => {
    if (user) {
      bcrypt
        .compare(req.body.password, user.password)
        .then((result) => {
          if (result) {
            const token = jwt.sign(
              { email: user.email },
              process.env.JWT_KEY,
              { expiresIn: '1h' }
            );
            res.status(200).json({
              message: 'Zalogowano',
              token,
            });
          } else {
            res.status(401).json({
              message: 'Niepoprawny login lub hasło',
            });
          }
        });
    } else {
      res.status(401).json({
        message: 'Niepoprawny login lub hasło',
      });
    }
  });
};
