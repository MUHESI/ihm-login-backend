import mongoose from "mongoose";

const URL_CLOUD = process.env.DB_URL_BV_CLOUD;
const URL_LOCAL = process.env.DB_URL_BV_LOCAL;

mongoose.connect(`${URL_LOCAL}`, {}, (err) => {
  if (err) throw err;
  console.log("Mongod connected ! ");
});
