const router = require('express').Router();
const {
  createCard, getCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const {
  createCardValidator, idValidator,
} = require('../middlewares/validate');

router.get('/', getCards);
router.post('/', createCardValidator, createCard);
router.delete('/:id', idValidator, deleteCard);
router.put('/:id/likes', idValidator, likeCard);
router.delete('/:id/likes', idValidator, dislikeCard);

module.exports = router;
