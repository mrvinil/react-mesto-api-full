const Card = require('../models/card');
const ApiError = require('../errors/ApiError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(ApiError.BadRequestError('Переданы некорректные данные при создании карточки'));
      }
      return next(err);
    });
};

const deleteCard = (req, res, next) => {
  const { id } = req.params;
  Card.findById(id)
    .then((card) => {
      if (!card) {
        return next(ApiError.NotFoundError('Карточка с указанным id не найдена'));
      }
      if (card.owner.toString() !== req.user._id.toString()) {
        return next(ApiError.Forbidden('Недостаточно прав!'));
      }
      return Card.findByIdAndRemove(id)
        .then((data) => res.send(data))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(ApiError.BadRequestError('Переданы некорректные данные для удаления карточки'));
      }
      return next(err);
    });
};

const likeCard = (req, res, next) => {
  const { id } = req.params;
  Card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(ApiError.NotFoundError('Передан несуществующий id карточки'));
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(ApiError.BadRequestError('Переданы некорректные данные для постановки лайка'));
      }
      if (err.name === 'CastError') {
        return next(ApiError.BadRequestError('Некорректный id пользователя'));
      }
      return next(err);
    });
};

const dislikeCard = (req, res, next) => {
  const { id } = req.params;
  Card.findByIdAndUpdate(
    id,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(ApiError.NotFoundError('Передан несуществующий id карточки'));
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(ApiError.BadRequestError('Переданы некорректные данные для снятия лайка'));
      }
      if (err.name === 'CastError') {
        return next(ApiError.BadRequestError('Некорректный id пользователя'));
      }
      return next(err);
    });
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
