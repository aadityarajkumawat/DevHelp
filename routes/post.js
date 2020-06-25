const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Post = require('../models/Post');
const User = require('../models/User');

// @REQ     POST api/post
// @DESC    upload a post
// @ACCESS  Private
router.post(
    '/',
    [
        auth,
        [
            check('heading', 'Heading cannot be empty!').not().isEmpty(),
            check('content', 'Content cannot be empty!').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { heading, content } = req.body;

        try {
            const user = await User.findOne({ _id: req.user.id });

            let post = new Post({
                user: req.user.id,
                name: user.name,
                heading,
                content,
            });

            await post.save();

            return res.status(200).json(post);
        } catch (err) {
            console.error(err.message);
            res.send('Server Error!');
        }
    }
);

// @REQ     GET api/post/:user_id
// @DESC    get all my posts
// @ACCESS  Public
router.get('/:user_id', async (req, res) => {
    const user_id = req.params.user_id;
    try {
        const user = await User.findOne({ _id: req.params.user_id });
        if (user) {
            const posts = await Post.find({ user: user_id });
            return res.status(200).json(posts);
        } else {
            res.status(404).json({ errors: [{ msg: 'No user Found' }] });
        }
    } catch (err) {
        console.error(err.message);
        res.send('Server Error!');
    }
});

// @REQ     GET api/post/:post_id
// @DESC    Get a post by id
// @ACCESS  Public
router.get('/open/:post_id', async (req, res) => {
    const post_id = req.params.post_id;
    try {
        const post = await Post.findById(post_id);
        if (post) {
            res.json(post);
        } else {
            res.json('No Post Found!');
        }
    } catch (err) {
        console.error(err.message);
        res.send('Server Error!');
    }
});

// @REQ     PUT api/post/:post_id
// @DESC    update a post
// @ACCESS  Private
router.put(
    '/:post_id',
    [
        auth,
        [
            check('heading', 'Heading is required').not().isEmpty(),
            check('content', 'Content is required').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { heading, content } = req.body;
        const post_id = req.params.post_id;
        const updatedPost = {
            heading,
            content,
        };
        try {
            const post = await Post.findOne({ _id: post_id });
            if (post) {
                post.heading = updatedPost.heading;
                post.content = updatedPost.content;

                await post.save();

                return res.status(200).json(post);
            } else {
                res.status(404).json({ errors: [{ msg: 'No post found' }] });
            }
        } catch (err) {
            console.error(err.message);
            res.send('Server Error!');
        }
    }
);

// @REQ     PUT api/post/like/:post_id
// @DESC    like or unlike a post
// @ACCESS  Private
router.put('/like/:post_id', auth, async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.post_id });

        // Check if the post is already liked by this user
        if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
                .length > 0
        ) {
            // Remove the like
            const removeIndex = post.likes
                .map((like) => like.user.toString())
                .indexOf(req.user.id);

            post.likes.splice(removeIndex, 1);

            await post.save();

            return res.status(200).json('Unliked');
        }
        post.likes.unshift({ user: req.user.id });

        await post.save();

        res.status(200).json('Liked');
    } catch (err) {
        console.error(err.message);
        res.send('Server Error!');
    }
});

// @REQ     DELETE api/post/:post_id
// @DESC    Delete a post
// @ACCESS  Private
router.delete('/:post_id', auth, async (req, res) => {
    const post_id = req.params.post_id;

    try {
        const post = await Post.findById(req.params.post_id);

        if (!post) {
            return res.status(404).json({ errors: [{ msg: 'No post found' }] });
        }

        if (post.user.toString() !== req.user.id) {
            return res
                .status(404)
                .json({ errors: [{ msg: 'Not Authorized' }] });
        }

        await post.remove();

        res.status(200).send('Deleted');
    } catch (err) {
        console.error(err.message);
        res.send('Server Error!');
    }
});

// @REQ     GET api/post/
// @DESC    Get all posts
// @ACCESS  Public
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find({}).limit(4);
        res.status(200).json(posts);
        console.log(posts);
    } catch (err) {
        console.error(err.message);
        res.send('Server Error!');
    }
});

module.exports = router;
