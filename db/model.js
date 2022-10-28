import mongoose from "mongoose";

const nombreCollectionProducts = "Products";
const nombreCollectionMessages = "messages";
const nombreCollectionUsers = "users";

const productSchema = mongoose.Schema({
  title: String,
  price: Number,
  thumbnail: String,
});

const messageSchema = mongoose.Schema({
  author: Object,
  text: String,
  fyh: String,
});

const userSchema = mongoose.Schema({
  username: String,
  password: String,
});

export const products = mongoose.model(nombreCollectionProducts, productSchema);
export const messages = mongoose.model(nombreCollectionMessages, messageSchema);
export const user = mongoose.model(nombreCollectionUsers, userSchema);
