const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Profile = require("../models/Profile");

// @REQ     POST api/profile
// @DESC    save profile data to DB
// @ACCESS  Private
router.post("/", auth, async (req, res) => {
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

      await profile.save();

      profile = await Profile.findOne({
        user: req.user.id,
      }).populate("user", ["name"]);

      return res.json(profile);
    } else {
      profile = new Profile(profileObject);
      await profile.save();
      return res.json(profile);
    }
  } catch (err) {
    console.error(err.message);
    res.send("Server Error!");
  }
});

// @REQ     GET api/profile
// @DESC    get the user's profile
// @ACCESS  Private
router.get("/", auth, async (req, res) => {
  const profile = await Profile.findOne({
    user: req.user.id,
  }).populate("user", ["name"]);
  if (profile) {
    res.json(profile);
  } else {
    res.json({ errors: [{ msg: "No User Found" }] });
  }
});

// @REQ    GET api/profile/user_id
// @DESC   get user profile by id
// @ACCESS Public
router.get("/:id", async (req, res) => {
  const user = req.params.id;
  try {
    const thatUser = await Profile.findOne({ user });
    if (thatUser) {
      res.status(200).json(thatUser);
    } else {
      res.status(400).json("Not Found");
    }
  } catch (error) {
    res.status(404).json("Server Error!");
  }
});

module.exports = router;
