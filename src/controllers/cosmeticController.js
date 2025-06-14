import { Router } from "express";
import consmeticService from "../services/consmeticService.js";
import errorMsg from "../utils/errorMsg.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const cosmeticController = Router();

cosmeticController.get("/catalog", async (req, res) => {
  try {
    const products = await consmeticService.getAll();

    res.render("cosmetic/catalog", { products });
  } catch (err) {
    const error = errorMsg(err);
    res.render("consmetic/catalog", { error });
  }
});

cosmeticController.get("/create", authMiddleware.isAuth, (req, res) => {
  res.render("cosmetic/create");
});
cosmeticController.post("/create", authMiddleware.isAuth, async (req, res) => {
  const data = req.body;
  const userId = req.user.id;

  try {
    await consmeticService.create(userId, data);

    res.redirect("/cosmetics/catalog");
  } catch (err) {
    const error = errorMsg(err);
    res.render("cosmetic/create", { error, data });
  }
});

cosmeticController.get("/:id/details", async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await consmeticService.getOne(productId);

    const userId = req.user?.id;

    const isOwner = String(product.owner) === userId;

    const numRecommendatations = product.recomendedList.length;

    const hasRecommended = product.recomendedList.find(
      (id) => String(id) === userId
    );

    res.render(`cosmetic/details`, {
      product,
      isOwner,
      numRecommendatations,
      hasRecommended,
    });
  } catch (err) {
    const error = errorMsg(err);
    res.render("cosmetic/details", { error });
  }
});

cosmeticController.get(
  "/:id/recommended",
  authMiddleware.isAuth,
  async (req, res) => {
    const productId = req.params.id;
    const userId = req.user?.id;

    try {
      await consmeticService.addLike(productId, userId);
      res.redirect(`/cosmetics/${productId}/details`);
    } catch (err) {
      const error = errorMsg(err);
      res.render("consmetic/details", { error });
    }
  }
);
cosmeticController.get("/:id/edit", authMiddleware.isAuth, async (req, res) => {
  const productId = req.params.id;
  const userId = req.user?.id;

  try {
    const product = await consmeticService.getOne(productId);

    const isOwner = String(product.owner) === userId;

    if (!isOwner) {
      throw new Error("This is not allowed!");
    }

    res.render("cosmetic/edit", { product });
  } catch (err) {
    const error = errorMsg(err);
    res.render("cosmetic/edit", { error });
  }
});
cosmeticController.post(
  "/:id/edit",
  authMiddleware.isAuth,
  async (req, res) => {
    const productId = req.params.id;
    const productData = req.body;
    const userId = req.user?.id;

    try {
      const product = await consmeticService.getOne(productId);

      const isOwner = String(product.owner) === userId;

      if (!isOwner) {
        throw new Error("This is not allowed!");
      }
      await consmeticService.update(productId, productData);

      res.redirect(`/cosmetics/${productId}/details`);
    } catch (err) {
      const error = errorMsg(err);
      res.render("cosmetic/edit", { error, product: productData });
    }
  }
);

cosmeticController.get(
  "/:id/delete",
  authMiddleware.isAuth,
  async (req, res) => {
    const productId = req.params.id;
    const userId = req.user.id;

    try {
      const product = await consmeticService.getOne(productId);

      const isOwner = String(product.owner) == userId;

      if (!isOwner) {
        res.redirect("/404");
        throw new Error("This is not allowed!");
      }

      await consmeticService.remove(productId);

      res.redirect("/cosmetics/catalog");
    } catch (err) {
      const error = errorMsg(err);
      res.render("cosmetic/details", { error });
    }
  }
);

cosmeticController.get("/search", async (req, res) => {
  const filter = req.query;

  try {
    const results = await consmeticService.getAll(filter);

    res.render("search", { results, filter });
  } catch (err) {
    const error = errorMsg(err);
    res.render("search", { error });
  }
});

export default cosmeticController;
