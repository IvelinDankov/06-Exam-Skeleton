import express from "express";
import { create } from "express-handlebars";

const port = 3000;

const app = express();

/* HBS START */
const hbs = create({
  extname: "hbs",
  //:TODO
  // helpers: {
  //   foo() {
  //     return "FOO!";
  //   },
  //   bar() {
  //     return "BAR!";
  //   },
  // },
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "src/views");
/* HBS END */

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));
