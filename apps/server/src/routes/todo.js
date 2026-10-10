import express from "express";
import * as TodoController from "../controllers/TodoController.js";

const router = express.Router();

router.get("/list", TodoController.list);
router.post("/create", TodoController.create);
router.post("/updateTitle", TodoController.updateTitle);
router.post("/completed", TodoController.completed);
router.post("/delete", TodoController.deleteItem);

export default router;
