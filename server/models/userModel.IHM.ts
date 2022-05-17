import mongoose, { Model, model, Schema } from "mongoose";

const UserIHMSchema = new Schema(
  {
    names: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    address: {
      type: String
    },
    phone: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const UserIHM = model("userihm", UserIHMSchema);
export default UserIHM;
