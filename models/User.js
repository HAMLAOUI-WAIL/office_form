import mongoose from "mongoose";
import validator from 'validator';

const { isEmail, contains } = validator;

import filter from "../util/filter.js";

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: [6, "Must be at least 6 characters long"],
      maxlength: [30, "Must be no more than 30 characters long"],
      validate: {
        validator: (val) => !contains(val, " "),
        message: "Must contain no spaces",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail, "Must be a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "Must be at least 8 characters long"],
    },
    biography: {
      type: String,
      default: "",
      maxLength: [250, "Must be at most 250 characters long"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  if (filter.isProfane(this.username)) {
    throw new Error("Username cannot contain profanity");
  }

  if (this.biography.length > 0) {
    this.biography = filter.clean(this.biography);
  }

  next();
});

const UserModel = mongoose.model("user", UserSchema);

export default UserModel;