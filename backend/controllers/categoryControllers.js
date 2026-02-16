import { sql } from "../config/db.js";
export const getCategories = async (req, res) => {
	try {
		const categories = await sql`
		SELECT * FROM categories ORDER_BY created_at DESC`;
		if (categories.length === 0) {
			console.log("unable to fetch categories from database(cct)", error);
			return res.status(400).json({ message: "category list is empty" })
		}
		return res.status(200).json({ data: categories });
	} catch (error) {
		console.log("couldn't get categories in getCategories controller", error.message);
		res.status(400).json({ message: "unable to fetch categories" });
	};
};

export const getCategory = async (req, res) => {
	const { categoryId } = req.params;
	if (!categoryId) {
		console.log("categoryId field is required in getCategory handler");
		return res.status(400).json({ message: "category categoryId is required" })
	}
	try {
		const category = await sql`
		SELECT * FROM categories
		WHERE categoryId = ${categoryId}`
	} catch (error) {
		console.log("couldn't get category in getCategory controller");
		res.status(404).json({ message: "category not found" });
	};

};

export const createCategory = async (req, res) => {
	const { categoryName } = req.body
	if (!categoryName) {
		console.log("categoryName field is required in createCategory handler");
		return res.status(400).json({ message: "categoryName is required" })
	}
	try {
		const [newCategory] = await sql`
		INSERT INTO category(categoryName) 
		VALUES(${categoryName})
		RETURNING *`;
		if (!newCategory) {
			console.log("Expense was not returned or created");
			return res.status(400).json({ message: "internal server error" })
		}

	} catch (error) {
		console.log("couldn't create category in createCategory handler", error.message);
		return res.status(400).json("internal server error");
	};
};

export const updateCategory = async (req, res) => {
	const { id } = req.params;
	const { categoryName } = req.body;
	try {


	} catch (error) {
		console.log("couldn't update category in updateCategory handler", error.message);
		return res.status(400).json({ message: "internal server error" });
	};
};

export const deleteCategory = async (req, res) => {
	const { id } = req.params;
	if (!id) {
		console.log("id field is required in deleteCategory handler");
		return res.status(400).json({ message: "internal server error" });
	}
	try {
		const [deletedCategory] = await sql`
		DELETE FROM category WHERE id = ${id} RETURNING *`;
		if (!deletedCategory) {
			console.log("category was not successful deleted or returned");
			res.status(400).json({ message: "internal server error" });
		}

	} catch (error) {
		console.log("couldn't delete category in deleteCategory handler", error.message);
		return res.status(400).json({ message: "internal server error" });
	};
};
