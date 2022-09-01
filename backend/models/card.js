const mongoose = require('mongoose');
const { linkRegExp } = require('../middlewares/validate');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [2, 'Название должно содержать минимум 2 символа, вы ввели {VALUE}'],
    maxLength: [30, 'Название должно содержать максимум 30 символов, вы ввели {VALUE}'],
    required: [true, 'Название обязательно для заполнения'],
  },
  link: {
    type: String,
    required: [true, 'Картинка обязательно для заполнения'],
    validate: {
      validator(v) {
        return linkRegExp.test(v);
      },
      message: 'Неверный URL.',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Автор обязательно для заполнения'],
    ref: 'User',
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
    ref: 'User',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', userSchema);
