const {
    confirmVerify,
    createUser,
    login,
    confirmEmail,
    rVerify,
    findCode,
    rPassword,
    createProfile,
    createAdvertise,
    getAllAdv,
    getAdvStatus,
    getAllInfo,
    deleteInfo
} = require('./user.controller');
const router  = require('express').Router();

router.post('/register', createUser);

router.post('/email_verify', confirmVerify);

router.post('/login', login);

router.post('/confirmEmail', confirmEmail);

router.post('/rVerify', rVerify);

router.post('/confirmVerify', findCode);

router.post('/resetPassword', rPassword);

router.post('/add_profile', createProfile);

router.post('/advertise', createAdvertise);

router.post('/getAllAdv', getAllAdv);

router.post('/myAdvStatus', getAdvStatus);

router.post('/getAllInfo', getAllInfo);

router.post('/delete', deleteInfo);

module.exports = router;