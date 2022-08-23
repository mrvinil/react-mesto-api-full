const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');
const { linkRegExp } = require('../middlewares/validate');
const Auth = require('../errors/Auth');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [2, 'Имя должно содержать минимум 2 символа, вы ввели {VALUE}'],
    maxLength: [30, 'Имя должно содержать максимум 30 символов, вы ввели {VALUE}'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minLength: [2, 'О себе должно содержать минимум 2 символа, вы ввели {VALUE}'],
    maxLength: [30, 'О себе должно содержать максимум 30 символов, вы ввели {VALUE}'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: {
      validator(link) {
        return linkRegExp.test(link);
      },
      message: 'Неверный URL.',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: [true, 'Email обязателен для заполнения'],
    unique: true,
    validate: {
      validator(email) {
        return isEmail(email);
      },
      message: 'Email указан не верно',
    },
  },
  password: {
    type: String,
    required: [true, 'Пароль обязателен для заполнения'],
    select: false,
  },
}, { versionKey: false });

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Auth('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Auth('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
