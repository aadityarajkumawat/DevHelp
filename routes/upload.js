const express = require('express');
const router = express.Router();
const multer = require('multer');
const Post = require('../models/Post');
const auth = require('../middleware/auth');
const cloudinary = require('cloudinary');
const config = require('config');

cloudinary.config({
    cloud_name: config.get('cloudName'),
    api_key: config.get('cloudinaryApiKey'),
    api_secret: config.get('cloudinaryApiSecret'),
});

const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    },
});

const imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const upload = multer({
    storage,
    fileFilter: imageFilter,
});

// @REQ     POST api/post
// @DESC    upload post img
// @ACCESS  Private
router.post('/', [auth, upload.single('file')], (req, res) => {
    console.log(req.file);
    cloudinary.v2.uploader.upload(
        req.file.path,
        {
            gravity: 'center',
            crop: 'fill',
        },
        async (err, result) => {
            if (err) {
                res.json(err);
                console.log('First ERR ->>', err);
            } else {
                try {
                    let post = new Post({
                        user: req.user.id,
                        name: 'Empty',
                        heading: 'Empty',
                        content: 'Empty',
                        image: result.secure_url,
                        imageId: result.public_id,
                    });
                    await post.save();
                    res.json(post);
                } catch (err) {
                    console.error(err.message);
                    res.send('Server Error!');
                }
            }
        }
    );
});

module.exports = router;
