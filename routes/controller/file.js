let multer = require('multer');

let uploadFile = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname.split('.')[1]);
    }
});
module.exports = multer({
    storage: uploadFile,
    fileFilter: (req, file, cb) => {
        let arr = file.mimetype.split('/');
        if (['png', 'jpg', 'jpeg'].includes(arr[arr.length - 1])) {
            cb(null, true);
        } else {
            return cb(console.error('only png,jpg,jpeg extensions are accepted'));
        }
    }
});
