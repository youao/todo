import express from "express";
import * as TodoController from "../controllers/TodoController.js";

const router = express.Router();

router.get("/list", TodoController.list);
router.get("/create", TodoController.create);
router.get("/update", TodoController.update);
router.get("/delete", TodoController.deleteItem);

export default router;
