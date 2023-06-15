const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    
    title: { type: String, require: true },
    username: { type: String ,require: true },
    content: { type: String, require: true },
    category: { type: String,require: true  },
    date: { type: Date, default: Date.now(),require: true  },
    likes: { type: Number, default: 0, require: true  },
    comments: [
      {
        username: { type: String },
        comment: { type: String },
      },
    ],
  },
  {
    versionKey: false,
  }
);

const BlogModel = mongoose.model("blog", blogSchema);

module.exports = {
  BlogModel,
};
