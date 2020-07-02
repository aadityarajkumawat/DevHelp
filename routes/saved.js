const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Saved = require('../models/Saved');

// @REQ     POST api/save/:post_id
// @DESC    Save a post to saved collection
// @ACCESS  Private
router.post('/:post_id', auth, async (req, res) => {
    try {
        let saved = await Saved.findOne({ user: req.user.id });
        if (!saved) {
            saved = new Saved({
                user: req.user.id,
                savedPosts: [],
            });

            saved.savedPosts.unshift(req.params.post_id);

            await saved.save();

            return res.json(saved);
        } else {
            const alreadyExist = saved.savedPosts.filter(
                (PostID) => PostID.toString() === req.params.post_id.toString()
            ).length;

            if (alreadyExist > 0) {
                const removeIndex = saved.savedPosts.indexOf(
                    req.params.post_id
                );
                saved.savedPosts.splice(removeIndex, 1);
                await saved.save();
                res.json(saved);
            } else {
                saved.savedPosts.unshift(req.params.post_id);
                await saved.save();
                return res.json(saved);
            }
        }
    } catch (err) {
        console.log(err.message);
        res.send('Sere');
    }
});

module.exports = router;
