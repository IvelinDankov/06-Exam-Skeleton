import { Router } from "express";
import userService from "../services/userService.js";
import { AUTH_COOKIE } from "../utils/userUtils.js";

const userController = Router();

userController.get("/register", (req, res) => {
  res.render("user/register");
});

userController.post("/register", async (req, res) => {
  const { username, email, password, rePass } = req.body;

  try {
    if (password !== rePass) {
      throw new Error("Password mismach!");
    }

    const user = await userService.register(username, email, password, rePass);

    const token = await userService.login(email, password);

    // attach token to cookieParser
    res.cookie(AUTH_COOKIE, token);

    res.redirect("/");
  } catch (err) {
    // :TODO error handling
    res.render("user/register", { username, email });
  }
});

userController.get("/login", (req, res) => {
  res.render("user/login");
});
userController.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await userService.login(email, password);

    // attach token to cookieParser
    res.cookie(AUTH_COOKIE, token);

    res.redirect("/");
  } catch (err) {}
});

export default userController;
