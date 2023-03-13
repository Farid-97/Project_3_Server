const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
    {
      userId:[{type: Schema.Types.ObjectId, ref:'User'}],
      comment:{type: String, required: true}
    },
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`
      timestamps: true,
    }
  );
  
  const Comment = model("User", commentSchema);
  
  module.exports = Comment;