const express = require('express');
const router = express.Router();
const multer = require('multer');
const Post = require('../models/Post');
const auth = require('../middleware/auth');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
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
    try {
        let post = new Post({
            user: req.user.id,
            name: 'Empty',
            heading: 'Empty',
            content: 'Empty',
            postImage: req.file.path,
        });
        await post.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.send('Server Error!');
    }
});

module.exports = router;
