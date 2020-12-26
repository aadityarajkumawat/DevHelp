const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  likes: [
    {
      user: { type: Schema.Types.ObjectId, ref: "user" },
    },
  ],
  comment: [
    {
      user: { type: Schema.Types.ObjectId, ref: "user" },
      comment_msg: String,
      nameOfUser: String,
      imgOfUser: String,
    },
  ],
  postImage: {
    type: String,
  },
  image: {
    type: String,
  },
  imageId: {
    type: String,
  },
});

module.exports = Post = mongoose.model("post", postSchema);
