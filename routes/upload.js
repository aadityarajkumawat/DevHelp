const express = require('express');
const router = express.Router();
const multer = require('multer');
const Post = require('../models/Post');
const auth = require('../middleware/auth');
const cloudinary = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: 'devhelp',
    api_key: '349325875226191',
    api_secret: 'vFF7WZWOqo7G3Ohu45faGrUHNSE',
});

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + file.originalname);
//     },
// });

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'upload-images',
        allowedFormats: ['jpg', 'png'],
    },
});

const fileFilter = (req, file, cb) => {
    // Reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, true);
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFilter,
});

// @REQ     POST api/post
// @DESC    upload post img
// @ACCESS  Private
router.post('/', [auth, upload.single('file')], async (req, res) => {
    console.log(req.file);
    cloudinary.v2.uploader.upload(
        req.file.path,
        {
            width: 1000,
            height: 1000,
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

// router.post('/posts', upload.single('file'), (req, res) => {
//     cloudinary.v2.uploader.upload(
//         req.file.path,
//         { width: 1000, height: 1000, gravity: 'center', crop: 'fill' },
//         async (err, result) => {
//             let user = await User.findOne({ _id: req.user._id });
//             if (err) {
//                 return res.json(err);
//             }
//             const { caption } = req.body;
//             const public_id = result.public_id;
//             const secure_url = result.secure_url;
//             const newPost = {
//                 image: secure_url,
//                 imageId: public_id,
//                 description: caption ? caption : '',
//                 author: {
//                     id: user._id,
//                     username: user.username,
//                     avatar: user.avatar,
//                 },
//             };
//             Post.create(newPost)
//                 .then((post) => {
//                     res.json(post);
//                 })
//                 .catch((err) => {
//                     res.json({
//                         message: 'An error occured when creating your post.',
//                     });
//                 });
//         }
//     );
// });

module.exports = router;
