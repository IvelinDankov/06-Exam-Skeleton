import { Router } from "express";
import consmeticService from "../services/consmeticService.js";

const homeController = Router();

homeController.get("/", async (req, res) => {
  const products = await consmeticService.getAll();
  res.render("home", { products });
});

export default homeController;
