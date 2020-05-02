const {
    getEmail,
    getAllUser,
} = require('./admin.service');
const {compareSync} = require('bcryptjs');
const {sign} = require('jsonwebtoken');

module.exports = {
    login: (req, res) => {
        const body = req.body;
        getEmail(body.email, (err, request) => {
            console.log('result', request);
            if (!request) {
                return res.json({
                    success: false,
                    msg: 'You are not admin'
                })
            }
            else {
                if (request.role === 'user') {
                    return res.j({
                        success: false,
                        msg: 'You are not admin'
                    })
                }
                else {
                    const result = compareSync(body.password, request.password);
                    if (result) {
                        const jsontoken = sign({result: request}, 'qwe1234', {
                            expiresIn: '1h'
                        });
                        return res.json({
                            success: true,
                            data: request,
                            msg: 'Login Successfully',
                            token: jsontoken,
                        });
                    } else {
                        return res.json({
                            success: false,
                            data: request,
                            msg: 'Invalid Password'
                        })
                    }
                }
            }
        })
    },

    getUsers: (req, res) => {
        const body = req.body;
        body.role = 'user';
        getAllUser(body.role, (err, result) => {
            return res.json({
                data: result
            })
        })
    }
};