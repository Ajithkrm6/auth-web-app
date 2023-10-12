import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a username"],
  },
  userName: {
    type: String,
    required: [true, "Please provide a userName"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide a valid email id"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiery: Date,
  verifyToken: String,
  verifyTokenExpiery: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
