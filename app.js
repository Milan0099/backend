require('dotenv').config();
const express = require('express');
const cors = require('cors');
const expressJwt = require('express-jwt');
const multer = require('multer');
const app = express();
const userRouter = require('./api/users/user.router');
const adminRouter = require('./api/admin/admin.router');
app.use(express.json());
app.use(cors());


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'upload')
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
});

let upload = multer({storage: storage});

app.post('/api/users/featuredImage', upload.single('file'), (req, res, next) => {
    const file = req.file;
    if (!file) {
        const error = new Error('Please upload a file');
        console.log('upload error', error );
        return next(error)
    }
    res.send(file);
});

app.post('/api/users/multipleFiles', upload.array('file[]'), (req, res, next) => {
    const files = req.files;
        if (!files) {
            const error = new Error('No File');
            return next(error)
        }
        res.send({status: 'OK'})
});

app.post('/api/users/videoFile', upload.single('file'), (req, res, next) => {
    const file = req.file;
    if (!file) {
        const error = new Error('Please upload a file');
        console.log('upload error', error );
        return next(error)
    }
    res.send({status: 'OK'})
});


app.use('/api/users', userRouter);

app.use('/api/admin', adminRouter);

app.use('/upload/:id',(req, res) => {
    const imageName = req.param('id');
    res.sendFile(__dirname + '/upload/' + imageName);
});
app.listen(process.env.APP_PORT, () => {
    console.log('Server up and running', process.env.APP_PORT);
});