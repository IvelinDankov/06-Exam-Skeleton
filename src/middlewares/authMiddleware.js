import jwt from "jsonwebtoken";

import { AUTH_COOKIE, jwtSecret } from "../utils/userUtils.js";

export default function auth(req, res, next) {
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
