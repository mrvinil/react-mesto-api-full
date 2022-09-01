const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ApiError = require('../errors/ApiError');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

function findUserById(id, res, next) {
  User.findById(id)
    .then((user) => {
      if (!user) {
        return next(ApiError.NotFoundError('Пользователь по указанному id не найден'));
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(ApiError.BadRequestError('Некорректный id пользователя'));
      }
      return next(err);
    });
}

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.clearCookie('jwt').status(201).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(ApiError.BadRequestError('Переданы некорректные данные при создании пользователя'));
      }
      if (err.name === 'MongoError' && err.code === 11000) {
        return next(ApiError.Conflict('Email уже зарегистрирован'));
      }
      return next(err);
    });
};

const getUser = (req, res, next) => {
  const { id } = req.params;
  findUserById(id, res, next);
};

const getUserInfo = (req, res, next) => {
  const id = req.user._id;
  findUserById(id, res, next);
};

const updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(
    id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        return next(ApiError.NotFoundError('Пользователь по указанному id не найден'));
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(ApiError.BadRequestError('Переданы некорректные данные при обновлении профиля'));
      }
      return next(err);
    });
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(
    id,
    {
      avatar,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        return next(ApiError.NotFoundError('Пользователь по указанному id не найден'));
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(ApiError.BadRequestError('Переданы некорректные данные при обновлении аватара'));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
      })
        .send({ token });
    })
    .catch(() => next(ApiError.Unauthorized('Неверный логин или пароль')));
};

const logout = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Вы успешно вышли из аккаунта' });
};

module.exports = {
  getUsers, getUser, createUser, getUserInfo, updateUserProfile, updateUserAvatar, login, logout,
};
