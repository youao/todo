import express from "express";
import * as TodoController from "../controllers/TodoController.js";

const router = express.Router();

router.get("/list", TodoController.list);
router.post("/create", TodoController.create);
router.post("/updateTitle", TodoController.updateTitle);
router.post("/setCompleted", TodoController.setCompleted);
router.post("/setDeleted", TodoController.setDeleted);
router.post("/delete", TodoController.deleteItem);

export default router;
