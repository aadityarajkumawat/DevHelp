const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Profile = require('../models/Profile');

// @REQ     POST api/profile
// @DESC    save profile data to DB
// @ACCESS  Private
router.post('/', auth, async (req, res) => {
    const { country, bio } = req.body;
    // make an empty profile
    const profileObject = {};
    profileObject.user = req.user.id;
    if (country) profileObject.country = country;
    if (bio) profileObject.bio = bio;
    try {
        let profile = await Profile.findOne({ user: req.user.id });
        if (profile) {
            // Update profile
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileObject },
                { new: true }
            );

            return res.json(profile);
        } else {
            profile = new Profile(profileObject);
            await profile.save();
            return res.json(profile);
        }
    } catch (err) {
        console.error(err.message);
        res.send('Server Error!');
    }
});

// @REQ     GET api/profile
// @DESC    get the user's profile
// @ACCESS  Private
router.get('/', auth, async (req, res) => {
    const profile = await Profile.findOne({
        user: req.user.id,
    }).populate('user', ['name']);
    if (profile) {
        res.json(profile);
    } else {
        res.json({ errors: [{ msg: 'No User Found' }] });
    }
});

module.exports = router;
