const express = require("express");
const router = express.Router();
const multer = require("multer");
const Post = require("../models/Post");
const auth = require("../middleware/auth");
const cloudinary = require("cloudinary");
const config = require("config");
const Profile = require("../models/Profile");

cloudinary.config({
  cloud_name: config.get("cloudName"),
  api_key: config.get("cloudinaryApiKey"),
  api_secret: config.get("cloudinaryApiSecret"),
});

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

const imageFilter = function (req, file, cb) {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error("Only image files are allowed!"), false);
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
router.post("/", [auth, upload.single("file")], (req, res) => {
  cloudinary.v2.uploader.upload(
    req.file.path,
    {
      gravity: "center",
      crop: "fill",
    },
    async (err, result) => {
      if (err) {
        res.json(err);
      } else {
        try {
          let post = new Post({
            user: req.user.id,
            name: "Empty",
            heading: "Empty",
            content: "Empty",
            image: result.secure_url,
            imageId: result.public_id,
          });
          await post.save();
          res.json(post);
        } catch (err) {
          console.error(err.message);
          res.send("Server Error!");
        }
      }
    }
  );
});

// @REQ     POST api/upload/proile
// @DESC    upload profile picture
// @ACCESS  Private
router.post("/profile", [auth, upload.single("profile")], (req, res) => {
  cloudinary.v2.uploader.upload(
    req.file.path,
    {
      gravity: "center",
      crop: "fill",
    },
    async (err, result) => {
      if (err) {
        res.json(err);
      } else {
        let profile;
        try {
          profile = await Profile.findOne({
            user: req.user.id,
          });
          if (profile) {
            profile.image = result.secure_url;
            profile.imageId = result.public_id;

            await profile.save();
            res.json(profile);
          } else {
            profile = new Profile({
              user: req.user.id,
              country: "",
              bio: "",
              image: result.secure_url,
              imageId: result.public_id,
            });

            await profile.save();
            res.json(profile);
          }
        } catch (err) {
          res.send("Server Error!");
        }
      }
    }
  );
});

module.exports = router;
