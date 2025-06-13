import jwt from "jsonwebtoken";

import { AUTH_COOKIE, jwtSecret } from "../utils/userUtils.js";

function auth(req, res, next) {
  const token = req.cookies[AUTH_COOKIE];

  if (!token) {
    return next();
  }

  const { id, email } = jwt.verify(token, jwtSecret);

  req.user = {
    id,
    email,
    isAuthenticated: true,
  };

  res.locals.user = {
    id,
    email,
    isAuthenticated: true,
  };

  next();
}

function isAuth(req, res, next) {
  if (!req.user) {
    throw new Error("Access denied!");
  }

  next();
}

export default {
  auth,
  isAuth,
};
