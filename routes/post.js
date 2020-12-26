const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const Post = require("../models/Post");
const User = require("../models/User");

// @REQ     POST api/post
// @DESC    upload a post --> after image is uploaded
// @ACCESS  Private
router.post(
  "/content/:post_id",
  [
    auth,
    [
      check("heading", "Heading cannot be empty!").not().isEmpty(),
      check("content", "Content cannot be empty!").not().isEmpty(),
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
      const post = await Post.findOne({ _id: req.params.post_id });
      post.name = user.name;
      post.heading = heading;
      post.content = content;
      post.comment = [];
      await post.save();
      return res.status(200).json(post);
    } catch (err) {
      console.error(err.message);
      res.send("Server Error!");
    }
  }
);

// @REQ     GET api/post/:user_id/:number
// @DESC    get all my posts
// @ACCESS  Public
router.get("/all/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const user = await User.findOne({ _id: req.params.user_id });
    if (user) {
      posts = await Post.find({ user: user_id }).limit(4);

      return res.status(200).json(posts);
    } else {
      res.status(404).json({ errors: [{ msg: "No user Found" }] });
    }
  } catch (err) {
    console.error(err.message);
    res.send("Server Error!");
  }
});

// @REQ     GET api/post/:user_id/:number
// @DESC    get all my posts
// @ACCESS  Public
router.get("/real-all/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  try {
    // console.log(user_id);
    const user = await User.findOne({ _id: req.params.user_id });
    if (user) {
      posts = await Post.find({ user: user_id });
      // console.log(posts);
      return res.status(200).json(posts);
    } else {
      res.status(404).json({ errors: [{ msg: "No user Found" }] });
    }
  } catch (err) {
    console.error(err.message);
    res.send("Server Error!");
  }
});

// @REQ     GET api/post/:post_id
// @DESC    Get a post by id
// @ACCESS  Public
router.get("/:post_id", async (req, res) => {
  const post_id = req.params.post_id;
  try {
    const post = await Post.findOne({ _id: post_id });
    if (post) {
      return res.json(post);
    } else {
      return res.json("No Post Found!");
    }
  } catch (err) {
    console.error(err.message);
    res.send("Server Error!->");
  }
});

// @REQ     PUT api/post/:post_id
// @DESC    update a post
// @ACCESS  Private
router.put(
  "/:post_id",
  [
    auth,
    [
      check("heading", "Heading is required").not().isEmpty(),
      check("content", "Content is required").not().isEmpty(),
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
        res.status(404).json({ errors: [{ msg: "No post found" }] });
      }
    } catch (err) {
      console.error(err.message);
      res.send("Server Error!");
    }
  }
);

// @REQ     PUT api/post/like/:post_id
// @DESC    like or unlike a post
// @ACCESS  Private
router.put("/like/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.post_id });

    // Check if the post is already liked by this user
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      // Remove the like
      const removeIndex = post.likes
        .map((like) => like.user.toString())
        .indexOf(req.user.id);

      post.likes.splice(removeIndex, 1);

      await post.save();

      return res.status(200).send("Unliked" + req.params.post_id);
    } else {
      post.likes.unshift({ user: req.user.id });
      await post.save();
      res.status(200).send("Liked" + req.params.post_id);
    }
  } catch (err) {
    console.error(err.message);
    res.send("Server Error!");
  }
});

// @REQ     PUT api/post/comment/:post_id
// @DESC    comment on this post
// @ACCESS  Private
router.put("/comment/:user_id/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.post_id });
    const user = await User.findOne({ _id: req.params.user_id });
    const profile = await Profile.findOne({ user: req.user.id });
    if (post) {
      post.comment.push({
        user: req.user.id,
        comment_msg: req.body.comment_msg,
        nameOfUser: user.name,
        imgOfUser: profile.image,
      });
      await post.save();
      res.status(200).send("Commented" + req.params.post_id);
    } else {
      res.status(201).send("post not found");
    }
  } catch (err) {
    console.log(err.message);
    res.send("Server Error!");
  }
});

// @REQ     PUT api/post/comment/:post_id
// @DESC    comment on this post
// @ACCESS  Private
router.get("/comment/all/:post_id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.post_id });
    if (post) {
      const comments = post.comment;
      res.status(200).send(comments);
    } else {
      res.status(201).send("post not found");
    }
  } catch (err) {
    res.send("Server Error!");
  }
});

// @REQ     PUT api/post/like/:user_id
// @DESC    Get array of liked posts
// @ACCESS  Private
router.get("/:user/:post_id", auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.user });

    if (user) {
      const post = await Post.findOne({
        _id: req.params.post_id,
      });

      if (post) {
        const liked = post.likes;
        return res.json(liked);
      } else {
        console.log("Nope!!");
      }
    } else {
      console.log("User not Found!!");
    }
  } catch (err) {
    console.error(err.message);
    res.send("Server Error!");
  }
});

// @REQ     DELETE api/post/:post_id
// @DESC    Delete a post
// @ACCESS  Private
router.delete("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    let postID = post._id;

    if (!post) {
      return res.status(404).json({ errors: [{ msg: "No post found" }] });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(404).json({ errors: [{ msg: "Not Authorized" }] });
    }

    await post.remove();
    res.status(200).send("Deleted" + postID);
  } catch (err) {
    console.error(err.message);
    res.send("Server Error!");
  }
});

// @REQ     GET api/post/
// @DESC    Get all posts
// @ACCESS  Public
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({}).limit(4);
    res.status(200).json(posts);
  } catch (err) {
    console.error(err.message);
    res.send("Server Error!");
  }
});

module.exports = router;
