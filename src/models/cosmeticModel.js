import { Schema, Types, model } from "mongoose";

const consmeticSchema = new Schema({
  name: {
    type: String,
    required: [true, `Name is Required!`],
  },
  skin: {
    type: String,
    required: [true, `Skin is Required!`],
  },
  description: {
    type: String,
    required: [true, `Description is Required!`],
  },
  ingrediens: {
    type: String,
    required: [true, `Ingredians is Required!`],
  },
  benefits: {
    type: String,
    required: [true, `Benefits is Required!`],
  },
  price: {
    type: Number,
    required: [true, `Price is Required!`],
  },
  image: {
    type: String,
    required: [true, `Image is Required!`],
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
