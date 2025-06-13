import { Router } from "express";

const userController = Router();

userController.get("/register", (req, res) => {
  res.render("user/register");
});

userController.get("/login", (req, res) => {
  res.render("user/login");
});

export default userController;
