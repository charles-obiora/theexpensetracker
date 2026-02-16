import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";


const BASE_URL = "http://localhost:4000";


const useExpenseStore = create((set, get) => ({
	expenses: [],
	loading: false,
	error: null,

	//addExpense: set((state) => state.expenses.push()),
	deleteExpense: async (id) => {
		set({ loading: true });
		try {
			const response = await axios.delete(`${BASE_URL}/api/expenses`, { params: { id } });
			if (response.data.data) {
				/* const filtered = get().expenses.filter((expense) => expense.expenseid !== response.data.data.expenseid);
				console.log(filtered); */
				set((state) => ({ expenses: state.expenses.filter(expense => expense.expenseid !== response.data.data.expenseid), error: null }));
				toast.success("Product deleted successfully");
			} else if (response.data.message) {
				toast.error(response.data.message);
			}

		} catch (error) {
			console.log(error.response.data.message);
			//set({error: "Expense was not successfully deleted"})
			toast.error("Something went wrong");
		} finally {
			set({ loading: false })
			console.log(get().expenses);
		}
	},

	getExpenses: async () => {
		set({ loading: true });
		try {
			const response = await axios.get(`${BASE_URL}/api/expenses`);
			if (response.data.data) {
				set({ expenses: response.data.data, error: null });
			} else {
				set({ expenses: response.data.message, error: null });
			}
		} catch (error) {
			if (error.response?.status === 429) {
				set({ error: "Rate Limit Exceeded" });
			} else if (error.response.data.message) {
				set({ error: error.response.data.message });
			}
		} finally {
			set({ loading: false })
		}
	},

	createExpense: async (expensename, cost, description) => {
		set({ loading: true });
		try {
			const response = await axios.post(`${BASE_URL}/api/expenses`, { expensename, cost, description });
			if (response.data.data) {
				set((state) => ({ expenses: state.expenses.push(response.data.data) }));
			} else if (response.data.message) {
				console.log(response.data.message);
			}

		} catch (error) {
			set({ error: error.response.data.message });
			console.log(error.response.data.message);
		} finally {
			set({ loading: false })
		}

	}

}))

export default useExpenseStore