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

    findEmail: (body, callback) => {
        const email = body[0].email;
        pool.query(
            `update users set firstName = "`+body[0].firstName +`",
                              lastName = "`+body[0].lastName +`",
                              city = "`+body[0].yourCity+`"
              where email = ?`,
            [email],
            (err, results) => {
                if (err) {
                    // console.log('error',err);
                    return callback(err)
                }
                return callback(null, results)
            }
        )
    },

    advertise: (data, callback) => {
        pool.query(
            `insert into advertise(email, title, featuredImage, description, tags, price, discountedPrice, phoneNumber, location, category, adImage, adVideo, status)
            values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                data.email,
                data.title,
                data.featured_image,
                data.ckeditor,
                data.tags,
                data.price,
                data.discounted_price,
                data.phone_number,
                data.location,
                data.category,
                data.images.join("*"),
                data.ad_video,
                data.status
            ],
            (error, results) => {
                if (error) {
                    console.log('errors', error);
                    return callback(error)
                }
                return callback(null, results)
            }
        )
    },

    getAdv: (email, callback) => {
        pool.query(
            `select * from advertise where email = ?`,
            [email],
            (err, result) => {
                if (err) {
                    return callback(err)
                }
                return callback(null, result)
            }
        )
    },

    advStatus: (data, callback) => {
        const myEmail = data.myEmail;
        const status = data.status;
        if (status === 'All') {
            pool.query(
                `select * from advertise where email = ?`,
                [myEmail],
                (err, result) => {
                    if (err) {
                        return callback(err)
                    }
                    return callback(null, result)
                }
            )
        }
        else {
            pool.query(
                `select * from advertise where email = ? AND status= ?`,
                [myEmail, status],
                (err, result) => {
                    if (err) {
                        return callback(err)
                    }
                    return callback(null, result)
                }
            )
        }
    }

};