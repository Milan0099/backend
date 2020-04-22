const {
    confirmVerify,
    createUser,
    login
} = require('./user.controller');
const router  = require('express').Router();

router.post('/register', createUser);

router.post('/email_verify', confirmVerify);

router.post('/login', login);

module.exports = router;