const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your name."],
    maxLength: [30, "Name con't exceed 30 character."],
    minLength: [4, "Name should have more than 4 character."],
  },
  email: {
    type: String,
    required: [true, "Please Enter your email."],
    unique: true,
    validate: [validator.isEmail, "Please Enter your valid email."],
  },
  password: {
    type: String,
    required: [true, "Please Enter your password."],
    minLength: [8, "password should be greater than 8 characters."],
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  designation: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
