import express from "express";
import AuthMilldleware from "../middlewares/AuthMilldleware.js";
import * as TodoController from "../controllers/TodoController.js";

const router = express.Router();

router.get("/list", AuthMilldleware, TodoController.list);
router.post("/create", AuthMilldleware, TodoController.create);
router.post("/updateTitle", AuthMilldleware, TodoController.updateTitle);
router.post("/setCompleted", AuthMilldleware, TodoController.setCompleted);
router.post("/setDeleted", AuthMilldleware, TodoController.setDeleted);
router.post("/delete", AuthMilldleware, TodoController.deleteItem);

export default router;
