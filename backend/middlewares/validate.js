const { celebrate, Joi } = require('celebrate');

// eslint-disable-next-line no-useless-escape
const linkRegExp = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/[\w.-]*)*\/?$/;

const createUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(linkRegExp),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const updateUserProfileValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const updateUserAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(linkRegExp).required(),
  }),
});

const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const createCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().pattern(linkRegExp).required(),
  }),
});

const idValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  linkRegExp,
  createUserValidator,
  updateUserProfileValidator,
  updateUserAvatarValidator,
  loginValidator,
  createCardValidator,
  idValidator,
};
