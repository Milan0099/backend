const {
    confirmVerify,
    createUser,
    login,
    createProfile
} = require('./user.controller');
const router  = require('express').Router();

router.post('/register', createUser);

router.post('/email_verify', confirmVerify);

router.post('/login', login);

router.post('/add_profile', createProfile);


module.exports = router;