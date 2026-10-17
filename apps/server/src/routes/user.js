import express from "express";
import AuthMilldleware from "../middlewares/AuthMilldleware.js";
import * as UserController from "../controllers/UserController.js";

const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/info", AuthMilldleware, UserController.info);

export default router;
