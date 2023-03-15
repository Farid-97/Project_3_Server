const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    username: {
      type: String,
      required: [true, "Username is required."],
    },
    imgUrl: {
      type: String,
      default: 'https://assets.reedpopcdn.com/star-wars-is-grogu-related-to-yoda.webp/BROK/resize/1200x1200%3E/format/jpg/quality/70/star-wars-is-grogu-related-to-yoda.webp'
    },
    post: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    favourites: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
