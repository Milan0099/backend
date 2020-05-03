const {
    findUser,
    create,
    userVerify,
    getUserByEmail,
    findEmail,

} = require('./user.service');
const {genSaltSync, hashSync, compareSync} = require('bcryptjs');
const {sign} = require('jsonwebtoken');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        findUser(body.email, (err, results) => {
            if (results) {
                console.log('Email is already existed');
                return res.json({
                    success: false,
                    data: 'User is already existed'
                })
            }
            else {
                const salt = genSaltSync(10);
                body.password = hashSync(body.password, salt);
                let token = crypto.randomBytes(10).toString('hex');
                body.verify = token;
                body.active = '0';
                body.role = 'user';
                create(body, (err, results) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            success: 0,
                            message: 'Database connection error'
                        });
                    }
                    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                    const msg = {
                        to: body.email,
                        from: 'timon0305@outlook.com',
                        subject: 'Account Verification Token',
                        text: 'Hello,'+ body.name + '\n\n' +
                            'Please verify your account code \n\n' + token  + '\n',
                    };
                    sgMail.send(msg);

                    return res.status(200).json({
                        success: true,
                        data: results,
                    })
                })
            }
        });
    },

    confirmVerify: (req, res) => {
        let code = req.body.code;
        userVerify(code, (err, results) => {
            if (results.changedRows)  {
                return res.json({
                    success: true,
                    data: "Successfully Verified"
                })
            }
            else {
                return res.json({
                    success: false,
                    data: 'Invalid Verified.'
                })
            }
        })
    },

    login: (req, res) => {
        const  body =  req.body;
        getUserByEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: false,
                    data: null,
                    msg: `User doesn't exist. 
                    Are you going to register now?`
                })
            }
            if (results.active === '1') {
                const result = compareSync(body.password,results.password);
                if (result) {
                    results.password = undefined;
                    const jsontoken = sign({result: results}, 'qwe1234', {
                        expiresIn: '1h'
                    });
                    return res.json({
                        success: true,
                        data: results,
                        msg: 'Login Successfully',
                        token: jsontoken,
                    });
                }
                else {
                    return res.json({
                        success: false,
                        data: results,
                        msg: 'Invalid Password'
                    })
                }
            }
            else {
                return res.json({
                    success: false,
                    data: results,
                    msg: 'You have to verify. Are you going to verify now?'
                })
            }
        })
    },

    createProfile: (req, res) => {
        const body = req.body;
        findEmail(body, (req, response) => {
            return res.json({
                success: true,
                msg: 'Successfully Inserted'
            })
        })
    }
};