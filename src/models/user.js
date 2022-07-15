import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: { type: String},
  phoneNumber: { type: String},
  lastFourPhoneNumber: { type: String},
  password: { type: String },
  gender: { type: String },
  grade: { type: String },
  age: { type: String },
  clubs: [{type: String }],
  mmr: { type: Number, default: 1000},
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

const User = mongoose.model("User", userSchema);
export default User;