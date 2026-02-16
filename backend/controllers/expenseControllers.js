import { sql } from "../config/db.js";
export const getExpenses = async (req, res) => {
	try {
		const Expenses = await sql`
		SELECT * FROM expenses
		ORDER BY created_at DESC`;/* this line is necessary to ensure the 
		Expenses are returned in the correct order */
		/* an empty array check */
		if (Expenses.length === 0) {
			console.log("it seems the get request was successful but there are no expenses in the db");
			return res.status(404).json({ message: "No Expenses found" });
		}
		console.log("Expenses successfully created");
		res.status(200).json({ data: Expenses });
	} catch (error) {
		console.log("error in getExpenses handler(2)", error.message);
		res.status(500).json({ message: "Database error" });
	}
}

export const getExpense = async (req, res) => {
	const { id: expenseid } = req.params;

	if (!expenseid) {
		console.log("expenseid field is required in getExpense handler");
		return res.status(400).json({ message: "expenseid field is required" });
	}

	try {
		const [expense] = await sql`
		SELECT * FROM Expenses WHERE expenseid = ${expenseid}`
		if (!expense) {
			console.log("Expense was not successfully retrieved in getExpense handler");
			return res.status(400).json({ message: "Expense does not exist" });
		}
		console.log(expense);
		return res.status(200).json({ data: expense })
	} catch (error) {
		console.log("error in getExpense handler", error.message);
		res.status(400).json({ message: "internal server error" });
	}

}

export const createExpense = async (req, res) => {
	const { expensename, cost, description } = req.body;

	if (!expensename || !cost || !description) {
		console.log("All the fields are required in 'createExpense handler");
		return res.status(400).json({ message: "All fields are required" });
	}
	try {
		/* PostgreSQL (and Neon) doesn’t know ahead of time how many rows a query will produce. To  		keep the API consistent, sql always wraps the result in an array, even for INSERT … 				RETURNING *. */
		const [newExpense] = await sql`
		INSERT INTO Expenses (expensename, cost, description)
		VALUES(${expensename}, ${cost}, ${description})
		RETURNING *`

		if (!newExpense) {
			console.log("Expense was not returned or created");
			return res.status(400).json({ message: "internal server error" })
		}
		console.log("Expense successfully created");
		res.status(201).json({ data: newExpense });
	} catch (error) {
		console.log("error occurred while creating expense in createExpense handler", error.message);
		res.status(400).json({ message: "internal server error" });
	}
}

export const updateExpense = async (req, res) => {
	const { expensename, cost, description } = req.body;
	const { expenseid } = req.params;

	if (!expensename || !cost || !description) {
		console.log("All the fields are required in 'updateExpense handler");
		return res.status(400).json({ message: "All fields are required" });
	}
	try {
		const [updatedExpense] = await sql`
		UPDATE expenses
		SET expenseName=${expensename}, cost=${cost}, description=${description}
		WHERE expenseid = ${expenseid};
		RETURNING *`;

		if (!updatedExpense) {
			console.log("Expense was not successfully updated (expenseId might not exist)");
			return res.status(404).json({ message: "Expense not updated" })
		}
		res.status(200).json({ data: updatedExpense });
	} catch (error) {
		console.log("error in updateExpense handler", error.message);
		res.status(500).json({ message: error.message });
	}
}

export const deleteExpense = async (req, res) => {
	const { id } = req.query
	if (!id) {
		console.log("id field is required in deleteExpense handler");
		return res.status(500).json({ message: "id field is required" })
	}
	console.log(id);
	try {
		const [deletedExpense] = await sql`
		DELETE FROM expenses
		WHERE expenseid = ${id}
		RETURNING *`

		if (!deletedExpense) {
			console.log("expense was not successfully deleted (id might not exist)");
			return res.status(404).json({ message: "expense not found" })
		}
		console.log("Expense successfully deleted");
		return res.status(201).json({ data: deletedExpense });

	} catch (error) {
		console.log("error in deleteExpense handler", error.message);
		return res.status(500).json({ message: "internal server error" });
	}
}