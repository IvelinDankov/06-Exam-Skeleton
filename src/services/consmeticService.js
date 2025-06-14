import Cosmetics from "../models/cosmeticModel.js";

export default {
  async getAll(filter = {}) {
    let result = Cosmetics.find();

    if (filter.search) {
      result = result.find({
        name: { $regex: new RegExp(filter.search), $options: "i" },
      });
    }

    return result;
  },

  create(userId, data) {
    return Cosmetics.create({ ...data, owner: userId });
  },

  getOne(id) {
    return Cosmetics.findById(id);
  },

  addLike(productId, userId) {
    return Cosmetics.findByIdAndUpdate(productId, {
      $push: {
        recomendedList: userId,
      },
    });
  },

  update(productId, productData) {
    return Cosmetics.findByIdAndUpdate(productId, productData);
  },

  remove(productId) {
    return Cosmetics.findByIdAndDelete(productId);
  },
};
