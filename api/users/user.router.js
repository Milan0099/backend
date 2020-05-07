const {
    confirmVerify,
    createUser,
    login,
    createProfile,
    createAdvertise,
    getAllAdv,
    getAdvStatus
} = require('./user.controller');
const router  = require('express').Router();

router.post('/register', createUser);

router.post('/email_verify', confirmVerify);

router.post('/login', login);

router.post('/add_profile', createProfile);

router.post('/advertise', createAdvertise);

router.post('/getAllAdv', getAllAdv);

router.post('/myAdvStatus', getAdvStatus);

module.exports = router;