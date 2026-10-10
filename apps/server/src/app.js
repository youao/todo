import express from "express";
import bodyParser from "body-parser";
import installRoutes from "./routes/routes.js";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

installRoutes(app);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
