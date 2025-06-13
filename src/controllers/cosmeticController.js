import { Router } from "express";
import consmeticService from "../services/consmeticService.js";
import errorMsg from "../utils/errorMsg.js";

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

cosmeticController.get("/create", (req, res) => {
  res.render("cosmetic/create");
});
cosmeticController.post("/create", async (req, res) => {
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
});

cosmeticController.get("/:id/recommended", async (req, res) => {
  const productId = req.params.id;
  const userId = req.user?.id;

  await consmeticService.addLike(productId, userId);
  res.redirect(`/cosmetics/${productId}/details`);
});
cosmeticController.get("/:id/edit", async (req, res) => {
  const productId = req.params.id;
  const product = await consmeticService.getOne(productId);
  res.render("cosmetic/edit", { product });
});
cosmeticController.post("/:id/edit", async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;

  await consmeticService.update(productId, productData);

  res.redirect(`/cosmetics/${productId}/details`);
});

cosmeticController.get("/:id/delete", async (req, res) => {
  const productId = req.params.id;
  await consmeticService.remove(productId);

  res.redirect("/cosmetics/catalog");
});

export default cosmeticController;
