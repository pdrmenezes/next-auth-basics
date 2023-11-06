import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  {
    // handles createdAt and updatedAt if needed
    timestamps: true,
  }
);

// as our User interface we'll use the mongoose model if it exists, else, we'll create it from our userSchema object
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
