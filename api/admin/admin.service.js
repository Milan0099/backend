const pool = require('../../config/database');

module.exports = {
    getEmail: (email, callback) => {
        pool.query(
            `select * from users where email = ?`,
            [email],
            (error, results) => {
                if (error) {
                    return callback
                }
                return callback(null, results[0])
            }
        )
    },

    getAllUser: (role, callback) => {
        pool.query(
            `select * from users where role = ?`,
            [role],
            (error, results) => {
                if (error) {
                    return callback;
                }
                return callback(null, results);
            }
        )
    }
};