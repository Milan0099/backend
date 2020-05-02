const pool = require('../../config/database');


module.exports = {
    findUser: (email, callback) => {

        pool.query(
            `select * from users where email = ?`,
            [email],
            (err, results) => {
                if (err) {
                    callback(err);
                }
                return callback(null, results[0]);
            }
        )
    },

    create: (data, callback) => {
        pool.query(
            `insert into users(name, email, role, password, verify, active)
            values(?, ?, ?, ?, ?, ?)`,
            [
                data.name,
                data.email,
                data.role,
                data.password,
                data.verify,
                data.active,
            ],
            (error, results) => {
                if (error) {
                   return callback(error)
                }
                return callback(null, results)
            }
        )
    },

    userVerify: (code, callback) => {
        console.log('-code--', code);
        pool.query(
            `update users set active = "1" where verify = ?`,
            [code],
            (err, results) => {
                if (err) {
                    callback(err);
                }
                return callback(null, results);
            }
        )
    },

    getUserByEmail: (email, callBack) => {
        pool.query(
            `select * from users where email = ?`,
            [email],
            (error, results) => {
                if (error) {
                    console.log(error);
                  return  callback(error);
                }
                return callBack(null, results[0]);
            }
        )
    },

};