import express from "express";

import hbsCofig from "./config/config.js";
import routes from "./routes.js";

const port = 3000;
const app = express();

app.use(express.static("src/public"));
app.use(express.urlencoded());

hbsCofig(app);

app.use(routes);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
