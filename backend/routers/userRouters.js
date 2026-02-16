import express from "express";
import { getUser, updateUser, deleteUser, createUser } from "../controllers/userControllers.js";

const router = express.Router();

//router.get("/");
router.get("/:id", getUser);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
