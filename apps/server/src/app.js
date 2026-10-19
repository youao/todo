import express from "express";
import bodyParser from "body-parser";
import installRoutes from "./routes/routes.js";
import path from "node:path";
import sendJson from "./middlewares/SendJsonMilldleware.js";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(sendJson);

installRoutes(app);

const publicDir = path.resolve("public");
app.use(express.static(publicDir));
app.use("/uploads", express.static("uploads"));

app.use((req, res, next) => {
  if (req.method !== "GET") return next();
  if (req.path.startsWith("/api/")) return next();
  if (!req.accepts("html")) return next();
  if (req.path.startsWith("/admin/")) {
    res.sendFile(path.join(publicDir, "admin/index.html"));
  } else {
    res.sendFile(path.join(publicDir, "index.html"));
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
