const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Saved = require('../models/Saved');
const Post = require('../models/Post');

// @REQ     POST api/save/:post_id
// @DESC    Save a post to saved collection
// @ACCESS  Private
router.post('/:post_id', auth, async (req, res) => {
    const post_id = req.params.post_id;
    try {
        let saved = await Saved.findOne({ user: req.user.id });
        const post = await Post.findOne({ _id: post_id });
        // console.log(saved);
        // console.log(post);

        // Checking posts
        if (post) {
            // Checking the saved object
            // console.log(post);
            if (!saved) {
                saved = new Saved({
                    user: req.user.id,
                    savedPosts: [],
                });

                let savedPostObject = {};
                savedPostObject.savedID = post._id;
                if (post.heading) savedPostObject.heading = post.heading;
                if (post.content) savedPostObject.content = post.content;

                saved.savedPosts.unshift(savedPostObject);

                await saved.save();

                return res.send('__saved__');
            } else {
                const alreadyExist = saved.savedPosts.filter(
                    (thisID) => thisID.savedID === req.params.post_id
                ).length;

                if (alreadyExist > 0) {
                    const removeIndex = saved.savedPosts
                        .map((savedPost) => savedPost.savedID)
                        .indexOf(req.params.post_id);

                    saved.savedPosts.splice(removeIndex, 1);
                    await saved.save();
                    res.send('__unsaved__');
                } else {
                    let savedPostObject = {};
                    savedPostObject.savedID = post._id;
                    if (post.heading) savedPostObject.heading = post.heading;
                    if (post.content) savedPostObject.content = post.content;

                    saved.savedPosts.unshift(savedPostObject);
                    await saved.save();
                    return res.send('__saved__');
                }
            }
        } else {
            res.send('No post found');
            // console.log('No post found');
        }
    } catch (err) {
        console.log(err.message);
        res.send('Server Error!');
    }
});

// @REQ     GET api/save
// @DESC    Get the posts saved by user
// @ACCESS  Private
router.get('/', auth, async (req, res) => {
    try {
        const saved = await Saved.findOne({ user: req.user.id });
        const savedPosts = saved.savedPosts;
        res.json(savedPosts);
    } catch (err) {
        console.log(err.message);
        res.send('Server Error!');
    }
});

module.exports = router;
