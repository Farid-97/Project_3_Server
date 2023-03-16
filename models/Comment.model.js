const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
    {
      userId:[{type: Schema.Types.ObjectId, ref:'User'}],
      comment:{type: String},
      postId: [{type: Schema.Types.ObjectId, ref:'Post'}]
    },
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`
      timestamps: true,
    }
  );
  
  const Comment = model("Comment", commentSchema);
  
  module.exports = Comment;