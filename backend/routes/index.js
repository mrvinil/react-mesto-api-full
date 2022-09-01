const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const ApiError = require('../errors/ApiError');
const { loginValidator, createUserValidator } = require('../middlewares/validate');
const { login, createUser, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signin', loginValidator, login);
router.post('/signup', createUserValidator, createUser);
router.post('/signout', logout);

router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use((req, res, next) => next(ApiError.NotFoundError('Адреса не существует')));

module.exports = router;
