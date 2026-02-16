import express from "express";
import { getExpense, getExpenses, createExpense, updateExpense, deleteExpense } from "../controllers/expenseControllers.js";

const router = express.Router();

/* router.get("/test", (req, res) => {
	console.log("Here i come");
	res.send("Here i come");
}); */

router.get("/", getExpenses);
router.get("/:id", getExpense);
router.post("/", createExpense);
router.put("/:id", updateExpense);
router.delete("/", deleteExpense);

export default router;