const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: function (){
      return !this.comment
    },
  },
  image: {
    type: String,
    required: function (){
      return !this.comment
    },
  },
  cloudinaryId: {
    type: String,
    // require: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ],
  postReplies: [{  
    type: mongoose.Schema.Types.ObjectId,
     ref: 'Reply' }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);
