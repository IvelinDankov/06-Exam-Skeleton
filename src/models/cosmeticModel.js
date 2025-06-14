import { Schema, Types, model } from "mongoose";

const consmeticSchema = new Schema({
  name: {
    type: String,
    required: [true, `Name is Required!`],
    minLength: [2, "Should be at least two characher long!"],
  },
  skin: {
    type: String,
    required: [true, `Skin is Required!`],
    minLength: [10, "Should be at least 10 character long"],
    maxLength: [100, "Should be max 200 character long"],
  },
  description: {
    type: String,
    required: [true, `Description is Required!`],
    minLength: [20, "Should be at least 20 character long"],
    maxLength: [100, "Should be max 200 character long"],
  },
  ingredients: {
    type: String,
    required: [true, `Ingredians is Required!`],
    minLength: [2, "Should be at least 2 character long"],
    maxLength: [50, "Should be max 50 character long"],
  },
  benefits: {
    type: String,
    required: [true, `Benefits is Required!`],
    minLength: [10, "Should be at least 10 character long"],
    maxLength: [100, "Should be max 100 character long"],
  },
  price: {
    type: Number,
    required: [true, `Price is Required!`],
    min: [0, "Price should be positive number"],
  },
  image: {
    type: String,
    required: [true, `Image is Required!`],
    validate: [/^https?:\/\/*$/, "Image Should start with https:// or http://"],
  },
  recomendedList: [
    {
      type: Types.ObjectId,
      ref: "User",
    },
  ],
  owner: {
    type: Types.ObjectId,
    ref: "User",
  },
});

const Cosmetics = model("Cosmetics", consmeticSchema);

export default Cosmetics;
