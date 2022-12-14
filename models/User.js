const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String },
    email: {
      type: String,
      unique: true,
    },
    age: Number,
    password: {
      type: String,
      require: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = User = model("user", userSchema);
