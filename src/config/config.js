import { create } from "express-handlebars";

export default function hbsCofig(app) {
  /* HBS START */
  const hbs = create({
    extname: "hbs",
  });

  app.engine("hbs", hbs.engine);
  app.set("view engine", "hbs");
  app.set("views", "src/views");
  /* HBS END */
}
