const { Schema, model } = require("mongoose");

const postSchema = new Schema(
    {
      title: { type: String, required: true},
      imgUrl: {type: String, required: true},
      description:{type: String},
      tags: {type: [String], required: true},
      comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
    },
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`
      timestamps: true,
    }
  );
  
  const Post = model("Post", postSchema);
  
  module.exports = Post;